@Entry
@Component
struct Index {
  @State display: string = '0';
  @State expression: string = '';
  @State history: string[] = [];
  @State storedValue: number = 0;
  @State pendingOperator: string = '';
  @State justEvaluated: boolean = false;

  private format(value: number): string {
    const rounded: number = Math.round(value * 10000000000) / 10000000000;
    return String(rounded);
  }

  private inputDigit(value: string): void {
    if (this.justEvaluated) {
      this.display = value;
      this.expression = '';
      this.justEvaluated = false;
      return;
    }
    if (this.display === '0') {
      this.display = value;
    } else if (this.display.length < 16) {
      this.display += value;
    }
  }

  private inputDecimal(): void {
    if (this.justEvaluated) {
      this.display = '0.';
      this.expression = '';
      this.justEvaluated = false;
      return;
    }
    if (!this.display.includes('.')) {
      this.display += '.';
    }
  }

  private chooseOperator(operator: string): void {
    if (this.pendingOperator !== '' && this.expression !== '') {
      this.calculate();
    }
    this.storedValue = Number(this.display);
    this.pendingOperator = operator;
    this.expression = `${this.display} ${operator}`;
    this.display = '0';
    this.justEvaluated = false;
  }

  private calculate(): void {
    if (this.pendingOperator === '') {
      return;
    }
    const right: number = Number(this.display);
    let result: number = this.storedValue;
    if (this.pendingOperator === '+') {
      result = this.storedValue + right;
    } else if (this.pendingOperator === '-') {
      result = this.storedValue - right;
    } else if (this.pendingOperator === '×') {
      result = this.storedValue * right;
    } else if (this.pendingOperator === '÷') {
      if (right === 0) {
        this.display = '不能除以 0';
        this.expression = '';
        this.pendingOperator = '';
        this.justEvaluated = true;
        return;
      }
      result = this.storedValue / right;
    }
    const formula: string = `${this.expression} ${this.display} = ${this.format(result)}`;
    this.display = this.format(result);
    this.history = [formula, ...this.history].slice(0, 5);
    this.expression = '';
    this.pendingOperator = '';
    this.justEvaluated = true;
  }

  private clear(): void {
    this.display = '0';
    this.expression = '';
    this.storedValue = 0;
    this.pendingOperator = '';
    this.justEvaluated = false;
  }

  private backspace(): void {
    if (this.justEvaluated || this.display === '不能除以 0') {
      this.clear();
      return;
    }
    if (this.display.length <= 1) {
      this.display = '0';
    } else {
      this.display = this.display.slice(0, -1);
    }
  }

  private percent(): void {
    const value: number = Number(this.display) / 100;
    this.display = this.format(value);
  }

  @Builder
  private button(label: string, action: () => void, color: string = '#173F56') {
    Button(label)
      .fontSize(22)
      .fontColor('#FFFFFF')
      .backgroundColor(color)
      .borderRadius(14)
      .height(58)
      .layoutWeight(1)
      .margin(4)
      .onClick(action);
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text('SUMMER CALCULATOR')
            .fontSize(12)
            .fontColor('#58B8A8')
            .letterSpacing(1.4)
          Text('夏日计算器')
            .fontSize(28)
            .fontWeight(FontWeight.Bold)
            .fontColor('#173F56')
            .margin({ top: 6 })
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)
        Text('实验 5')
          .fontSize(14)
          .fontColor('#708184')
      }
      .width('100%')
      .padding({ left: 24, right: 24, top: 20, bottom: 14 })

      Column() {
        Text(this.expression)
          .fontSize(16)
          .fontColor('#708184')
          .height(26)
          .width('100%')
          .textAlign(TextAlign.End)
        Text(this.display)
          .fontSize(38)
          .fontWeight(FontWeight.Bold)
          .fontColor('#173F56')
          .height(56)
          .width('100%')
          .textAlign(TextAlign.End)
      }
      .width('100%')
      .padding({ left: 20, right: 20, top: 16, bottom: 16 })
      .backgroundColor('#E6F2EF')
      .borderRadius(18)

      Row() {
        this.button('AC', () => this.clear(), '#D47771')
        this.button('⌫', () => this.backspace(), '#4B9FB5')
        this.button('%', () => this.percent(), '#4B9FB5')
        this.button('÷', () => this.chooseOperator('÷'), '#E79C50')
      }
      .width('100%')
      .margin({ top: 18 })
      Row() {
        this.button('7', () => this.inputDigit('7'))
        this.button('8', () => this.inputDigit('8'))
        this.button('9', () => this.inputDigit('9'))
        this.button('×', () => this.chooseOperator('×'), '#E79C50')
      }.width('100%')
      Row() {
        this.button('4', () => this.inputDigit('4'))
        this.button('5', () => this.inputDigit('5'))
        this.button('6', () => this.inputDigit('6'))
        this.button('-', () => this.chooseOperator('-'), '#E79C50')
      }.width('100%')
      Row() {
        this.button('1', () => this.inputDigit('1'))
        this.button('2', () => this.inputDigit('2'))
        this.button('3', () => this.inputDigit('3'))
        this.button('+', () => this.chooseOperator('+'), '#E79C50')
      }.width('100%')
      Row() {
        this.button('0', () => this.inputDigit('0'))
        this.button('.', () => this.inputDecimal())
        this.button('=', () => this.calculate(), '#087F78')
      }.width('100%')

      Row() {
        Text('最近计算')
          .fontSize(17)
          .fontWeight(FontWeight.Bold)
          .fontColor('#173F56')
        Text(`${this.history.length}/5`)
          .fontSize(13)
          .fontColor('#708184')
          .layoutWeight(1)
          .textAlign(TextAlign.End)
      }
      .width('100%')
      .margin({ top: 20, bottom: 8 })
      ForEach(this.history, (item: string) => {
        Text(item)
          .fontSize(14)
          .fontColor('#635744')
          .width('100%')
          .padding({ left: 14, right: 14, top: 8, bottom: 8 })
          .backgroundColor('#FFF7E5')
          .borderRadius(8)
          .margin({ top: 4 })
      }, (item: string) => item)
    }
    .width('100%')
    .height('100%')
    .padding({ left: 16, right: 16, bottom: 18 })
    .backgroundColor('#F5F8F7')
  }
}
