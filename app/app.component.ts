import { Component } from '@angular/core';

import { PieceModel } from './piece.model';
import { UserService } from './user.service';


@Component({
  selector: 'my-app',
  template: `
    <h1>Let's play the "Same game"</h1>
    <div>
      <button class="btn btn-success" type="button" (click)="start();">Start !</button>
    </div>
    <svg width="800" height="500">
      <g *ngFor="let row of grid">
        <g *ngFor="let col of row">
          <svg:rect *ngIf="col.isEmpty()" attr.x="{{col.getX() * SIZE}}" attr.y="{{col.getY() * SIZE}}" attr.width="{{SIZE}}" attr.height="{{SIZE}}" attr.fill="{{col.getColor()}}"></rect>
          <svg:circle *ngIf="!col.isEmpty()" attr.cx="{{col.getX() * SIZE + SIZE/2}}" attr.cy="{{col.getY() * SIZE + SIZE/2}}" attr.r="{{ SIZE/2 }}" attr.fill="{{col.getColor()}}" (click)="handleClick(col);"></circle>
        </g>
      </g>
    </svg>
  `,
  providers: [UserService]
})
export class AppComponent {

  private colors: Array<string> = ["red", "yellow", "green", "blue"];

  /**
   * Represent the grid board where each cell is either empty, or contains one PieceModel
   */
  private grid: Array<Array<PieceModel>>;

  /**
   * A piece size
   */
  private SIZE: number = 40;

  constructor(private userService: UserService){
    this.grid = this.initGrid(20, 10);

  }

  private initGrid(col: number, row: number): Array<Array<PieceModel>>{
    let grid: Array<Array<PieceModel>> = new Array<Array<PieceModel>>();
    for(let i = 0; i < row; i++){
      grid[i] = new Array<PieceModel>();
      for(let j = 0; j < col; j++){
        grid[i][j] = this.generateEmptyCell(i, j);
      }
    }
    return grid;
  }

  private generateEmptyCell(i: number, j: number): PieceModel{
    return new PieceModel(j, i, "gray", true);
  }

  private fillGrid(grid: Array<Array<PieceModel>>){
    for(let i = 0; i < grid.length; i++){
      for(let j = 0; j < grid[i].length; j++){
        grid[i][j] = new PieceModel(j, i, this.colors[Math.trunc(Math.random()*this.colors.length)]);
      }
    }
  }

  private start(){
    this.fillGrid(this.grid);
  }

  private handleClick(piece: PieceModel){
    let pieceSet: Array<PieceModel> = this.findPieces(piece, this.grid);
    if(pieceSet.length > 1){
      pieceSet.forEach((piece: PieceModel) => {
        this.grid[piece.getY()][piece.getX()] = this.generateEmptyCell(piece.getY(), piece.getX());
      });
      this.grid = this.squeezeGrid(this.grid);
    }else{
      console.log("Only one piece selected, can't do anything");
    }
  }

  private squeezeGrid(grid: Array<Array<PieceModel>>): Array<Array<PieceModel>>{
    // TODO Should "squeeze" the grid by making the piece go down, then left when there's an empty cell
    

    return grid;
  }

  private findPieces(piece:PieceModel, grid: Array<Array<PieceModel>>, alreadyParsed: Array<PieceModel> = []): Array<PieceModel>{
    let pieceSet: Array<PieceModel> = new Array<PieceModel>();
    if(alreadyParsed.indexOf(piece) !== -1){
      return pieceSet;
    }
    alreadyParsed.push(piece);
    pieceSet.push(piece);
    if(piece.getX()-1 >= 0){
      let tmp: PieceModel = grid[piece.getY()][piece.getX()-1];
      if(!tmp.isEmpty() && tmp.getColor() === piece.getColor()){
        pieceSet = pieceSet.concat(this.findPieces(tmp, grid, alreadyParsed));
      }
    }
    if(piece.getX()+1 < grid[piece.getY()].length){
      let tmp: PieceModel = grid[piece.getY()][piece.getX()+1];
      if(!tmp.isEmpty() && tmp.getColor() === piece.getColor()){
        pieceSet = pieceSet.concat(this.findPieces(tmp, grid, alreadyParsed));
      }
    }
    if(piece.getY()-1 >= 0){
      let tmp: PieceModel = grid[piece.getY()-1][piece.getX()];
      if(!tmp.isEmpty() && tmp.getColor() === piece.getColor()){
        pieceSet = pieceSet.concat(this.findPieces(tmp, grid, alreadyParsed));
      }
    }
    if(piece.getY()+1 < grid.length){
      let tmp: PieceModel = grid[piece.getY()+1][piece.getX()];
      if(!tmp.isEmpty() && tmp.getColor() === piece.getColor()){
        pieceSet = pieceSet.concat(this.findPieces(tmp, grid, alreadyParsed));
      }
    }
    return pieceSet;
  }

  /**
   * Do something when the component is initialized
   */
  public ngOnInit() {

  }
}
