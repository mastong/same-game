export class PieceModel {

  constructor(private x: number, private y: number, private color: string, private emptyCell: boolean = false){ }

  public getX(): number{
    return this.x;
  }

  public getY(): number{
    return this.y;
  }

  public setX(x: number): void{
    this.x = x;
  }

  public setY(y: number): void{
    this.y = y;
  }

  public getColor(): string{
    return this.color;
  }

  public setColor(color: string): void{
    this.color = color;
  }

  public isEmpty(): boolean{
    return this.emptyCell;
  }
}
