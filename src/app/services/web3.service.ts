import { Injectable } from '@angular/core';
const Web3 = require('web3');

declare let window:any;
declare let require:any;

const contractAbi = require('./contract.abi.json');
const contractAddress = '0x4a53043487d885bf9dfcfc7820371ca2703b7a51';


@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  public  web3:any;

  private account:string = null;
  private contract:any;
  private contractAddress:any;
  constructor() {
    this.initializeWeb3();

   }

   initializeWeb3(){
     if (window.web3 !== 'undefined') {
       //web3 = new Web3(web3.currentProvider);
       this.web3 = new Web3(window.web3.currentProvider);
       console.log("metamask is found");
     } else {
       // set the provider you want from Web3.providers
       //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
     }
     this.contract = this.web3.eth.contract(contractAbi).at(contractAddress);
   }
   public async getAccount():Promise<string>{
     if (this.account == null) {
       this.account = await new Promise((resolve,reject)=>{
         this.web3.eth.getAccounts((err,result)=>{
           if(err!=null){
             return reject(err);
           }
           return resolve(result);
         });
       }) as string;
     }
     return Promise.resolve(this.account);
   }
   public async owner():Promise<any>{
     const account = await this.getAccount();
     return new Promise((resolve,reject)=>{
       this.contract.owner.call((err,result)=>{
         if(err!=null){
           return reject(err);
         }
         return resolve(result);
       })
     }) as any;
   }

   public async getHerosOwner():Promise<number[]>{
     const account = await this.getAccount();
     return new Promise((resolve,reject)=>{
       this.contract.getHerosByOwner.call(account,(err,result)=>{
         if(err!=null){
           return reject(err);
         }
         return resolve(result);
       })
     }) as any;
   }

   public async getHerosById(id:number):Promise<any>{
     return new Promise((resolve,reject)=>{
       this.contract.Heros.call(id,(err,result)=>{
         if(err!=null){
           return reject(err);
         }
         return resolve(result);
       })
     }) as any;
   }

   public async getTotalHeros():Promise<any>{
     return new Promise((resolve,reject)=>{
       this.contract.totalHeros.call((err,result)=>{
         if(err!=null){
           return reject(err);
         }
         return resolve(result.toString());
       })
     }) as any;
   }

   public async Attack(myId,enemyId):Promise<any>{
     const account = await this.getAccount();
     return new Promise((resolve,reject)=>{
       this.contract.attack(myId,enemyId,{from:account[0]},
         (err,result)=>{
           if(err!=null){
             return reject(err);
           }
           return resolve(result);
       })
     }) as any;
   }

   public async levelUp(id):Promise<any>{
     const account = await this.getAccount();
     return new Promise((resolve,reject)=>{
       this.contract.levelUp(id,{from:account[0],value:this.web3.toWei(0.01,'ether')},
         (err,result)=>{
           if(err!=null){
             return reject(err);
           }
           return resolve(result);
       })
     }) as any;
   }

   public async changeName(id:number,name:string):Promise<any>{
     const account = await this.getAccount();
     return new Promise((resolve,reject)=>{
       this.contract.changeName(id,name,{from:account[0]},
         (err,result)=>{
           if(err!=null){
             return reject(err);
           }
           return resolve(result);
       })
     }) as any;
   }

   public async changeSkill(id:number,skill:number):Promise<any>{
     const account = await this.getAccount();
     return new Promise((resolve,reject)=>{
       this.contract.changeSkill(id,skill,{from:account[0]},
         (err,result)=>{
           if(err!=null){
             return reject(err);
           }
           return resolve(result);
       })
     }) as any;
   }

   public async createHero(name:string,type:number):Promise<any>{
     const account = await this.getAccount();
     return new Promise((resolve,reject)=>{
       this.contract.generateHeroRandom(name,type,{from:account[0]},
         (err,result)=>{
           if(err!=null){
             return reject(err);
           }
           return resolve(result);
       })
     }) as any;
   }

   public async withDraw():Promise<any>{
     const account = await this.getAccount();
     return new Promise((resolve,reject)=>{
       this.contract.withdraw({from:account[0]},(err,result)=>{
         if(err!=null){
           return reject(err);
         }
         return resolve(result.toString());
       })
     }) as any;
   }

}
