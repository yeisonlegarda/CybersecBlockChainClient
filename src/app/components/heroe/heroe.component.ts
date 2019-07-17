import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../services/web3.service';
import { faSync} from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  faSpinner = faSync;

  public allHeros:any[]=[];
  public herosUI:any[];
  public myHerosUI:any[];
  public mySelectedHero:any;
  loading:boolean;


  constructor(private heroesService:Web3Service) {

   }

  ngOnInit() {
    this.getOwner();
    this.getHeros()
    //this.getTotalHeros();
  }
  public getOwner(){
    this.heroesService.owner().then(result=>{
      console.log(result);
    }
  ).catch(err=>{
    console.log(err);
  })
  }

  public reloadHeros(){
    this.loading = true;
    this.getHeros();
    this.loading = false;
  }

  public getHeros(){

    this.herosUI=[];
    this.myHerosUI=[];
    this.mySelectedHero={};

      this.heroesService.getHerosOwner().then(resultIdOwner=>{
          let idxmyHeros:number[]=[];
          for (let valH in resultIdOwner){
            idxmyHeros.push(resultIdOwner[valH]['c'][0]);
          }
          this.heroesService.getTotalHeros().then(result=>{
            for (var i = 0;i<parseInt(result,10);i++){
              let itsMyHero = idxmyHeros.indexOf(i);
              if(itsMyHero >= 0){
                this.myHerosUI.push(this.getHerosById(i,true));
              }else{
                this.herosUI.push(this.getHerosById(i,false));
              }
            }
          }).catch(err=>{
            console.log(err);
          });

        }).catch(err=>{
          console.log(err);
        })
  }

  public getHerosById(id:number,itsMine:boolean):any{
    const herobyId:any = {};
    this.heroesService.getHerosById(id).then(result=>{
      herobyId.Id = id;
      herobyId.name = result[0].toString();
      herobyId.skill = result[1].toString();
      herobyId.type = result[2].toString();
      herobyId.level = result[3].toString();
      herobyId.readyTimer = result[4].toString();
      herobyId.winCount = result[5].toString();
      herobyId.lossCount = result[6].toString();
      herobyId.itsMine = itsMine;
    }
  ).catch(err=>{
    console.log(err);
  })
  return herobyId;
  }

  public async getTotalHeros():Promise<any>{
    //this.myHerosUI = await this.getHeros();

  }

  public Attack(enemyId){
    this.heroesService.Attack(this.mySelectedHero.Id,enemyId).then(result=>{
      console.log(result);
    }
    ).catch(err=>{
      console.log(err);
    })
  }

  public select(idx:number){
    this.mySelectedHero = this.myHerosUI.filter( hero => hero.Id == idx )[0];
  }

  public withDraw(){
    console.log("retirando fondos");
    this.heroesService.withDraw().then(result=>{
      console.log(result);
    }).catch(err=>{
      console.log(err);
    })
  }

}
