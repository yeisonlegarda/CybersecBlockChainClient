import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit {
  @Input() hero:any={};
  @Input() index:number;

  @Output() selectedHero:EventEmitter<number>;
  @Output() attackedHero:EventEmitter<number>;

  constructor(private router:Router,private heroesService:Web3Service) {
          this.selectedHero = new EventEmitter();
          this.attackedHero = new EventEmitter();
            }

  ngOnInit() {
  }


  verHeroe(){
    console.log(this.index);
    this.router.navigate(['/heroe',this.index]);
    //this.heroeSeleccionado.emit(this.index);
  }

  select(id:number){
      this.selectedHero.emit(id);
  }

  attack(id:number){
      this.attackedHero.emit(id);
  }

}
