export class Cell {
  constructor(x, y, symbol, color) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.color = color;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillText(this.symbol, this.x, this.y);
  }
}
export class AsciiEffect {
  symbols = " .:-=+*#%@";
  imgCellArr = [];
  pixels = [];
  ctx;
  width;
  height;

  constructor(ctx, img, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.ctx.drawImage(img, 0, 0, this.width, this.height);
    this.pixels = this.ctx.getImageData(0, 0, this.width, this.height);
    // this.symbols = this.symbols.split('').reverse().join();
  }
  convertToSymbol(avg) {
    // total length of symbols can be anything but avg is 255 max
    const inPercent = avg/255;
    const charIndex = Math.round(this.symbols.length * inPercent);
    return this.symbols.charAt(charIndex);
  }
  scanImage(size) {
    this.imgCellArr = []; // clearing to nothing
    for (let y = 0; y < this.pixels.height; y += size) {
      for (let x = 0; x < this.pixels.width; x += size) {
        const posX = x * 4; // as because each pixel has 4 values in the array
        const posY = y * 4;
        const pos = (posY * this.pixels.width) + posX;

        // the 4th element in array is opacity
        if(this.pixels.data[pos + 3] > 128) {
          const r = this.pixels.data[pos];
          const g = this.pixels.data[pos + 1];
          const b = this.pixels.data[pos + 2];
          const avg = ((0.21 * r) + (0.72 * g) + (0.07 * b) / 3); // based on this it will determine the symbol
          const color = `rgb(${r}, ${g}, ${b}, ${this.pixels.data[pos + 3]})`;
          // const color = `rgb(255, 255, 255, ${this.pixels.data[pos + 3]})`;
          const symbol = this.convertToSymbol(avg);
          this.imgCellArr.push(new Cell(x, y, symbol, color));
        }
      }
    }
  }
  drawAscii() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const ele of this.imgCellArr) {
      ele.draw(this.ctx)
    }
  }
  draw(cellSize) {
    this.scanImage(cellSize);
    this.drawAscii();
  }
}