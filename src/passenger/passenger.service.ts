import { Injectable, NotFoundException } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { PassengerInterface } from './interfaces/passenger.interface';

@Injectable()
export class PassengerService {
getPassenger():string{
    return 'Hello Nest Js';
}

getPassengerName(name : string):string{
    return `Hello Passenger ${name} !`
}

private passenger: PassengerInterface[]=[
    {
        id: 1,
        name:'Raihanul Islam',
        mail:'raihanulislam@gmail.com',
        phone: '1632641330',
        address:'Dhaka, Bangladesh',
        createdAt:new Date(),
        gender:'male',
        password:'123456',
    },
    {
        id: 2,
        name:'Shihab',
        mail:'shihab@gmail.com',
        phone: '1632641440',
        address:'Ghatail, Tangail',
        createdAt:new Date(),
        gender:'male',
        password:'123456',
    },
];


findAll():PassengerInterface[]{
    return this.passenger;
}


findOne(id:number):PassengerInterface{
    const singlePost=this.passenger.find(post=>post.id===id);
    if(!singlePost){
        throw new NotFoundException(`Passenger with ID ${id} is not Found`);
    }
    return singlePost;
}


create(createPassengerData: Omit<PassengerInterface,'id' | 'createdAt'>): PassengerInterface{
    const newPost: PassengerInterface={
        id:this.getNextId(),
        ...createPassengerData,
        createdAt:new Date(),
    }
    this.passenger.push(newPost);
    return newPost;
}


update(id: number, updatePassengerData: Partial<Omit<PassengerInterface,'id' | 'createdAt'>>): PassengerInterface{
    const currentIndexToEdit=this.passenger.findIndex(
        (post)=>post.id===id,
    );
    if(currentIndexToEdit===-1){
        throw new NotFoundException(`Passenger with ID ${id} not found !`)
    }
    this.passenger[currentIndexToEdit]={
        ...this.passenger[currentIndexToEdit],
        ...updatePassengerData,
        updatedAt: new Date(),
    }
    return this.passenger[currentIndexToEdit];
}


remove(id:number):{message:string}{
    const currentIndexToDelete = this.passenger.findIndex((post)=>post.id===id);
     if(currentIndexToDelete===-1){
        throw new NotFoundException(`Passenger with ID ${id} is not found`)
    }
    this.passenger.splice(currentIndexToDelete,1)
        return {message:`Passenger with ID ${id} has been deleted...`}  
}


private getNextId():number{
    return this.passenger.length>0
    ?Math.max(...this.passenger.map(post=> post.id))+1:1
}
updatePhotoPath(id: number, filename: string): PassengerInterface {
    const index = this.passenger.findIndex(post => post.id === id);
    if (index === -1) {
      throw new NotFoundException(`Passenger with ID ${id} not found`);
    }
    this.passenger[index].photoPath = filename;
    return this.passenger[index];
  }
}


