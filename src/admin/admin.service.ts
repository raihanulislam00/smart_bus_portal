import { Injectable, NotFoundException } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Post  } from './interfaces/post.interface';

@Injectable()
export class AdminService {
getAdmin():string{
    return 'Hello Nest Js';
}

getAdminName(name : string):string{
    return `Hello Admin ${name} !`
}

// getAllAdmin(){
//     return[
// {
//     id: 1,Name: 'Reza',email:'shahriarreza18@gmail.com'
// },
// {
//     id: 2,Name: 'Shihab',email:'shihab@gmail.com'
// }
//     ]
// }

// getAdminById(id: number){
//     const admin= this.getAllAdmin().find(admin=>admin.id===id)
//     return admin;
// }

private admin: Post[]=[
    {
        id: 1,
        name:'Shahriar Reza',
        mail:'shahriarreza18@gmail.com',
        phone: '1632641330',
        address:'Dhaka, Bangladesh',
        content:'This is Admin One Dashboard',
        createdAt:new Date(),
    },
    {
        id: 2,
        name:'Shihab Reza',
        mail:'shahriarreza@gmail.com',
        phone: '1632641440',
        address:'Ghatail, Tangail',
        content:'This is Admin Two Dashboard',
        createdAt:new Date(),
    },
];


findAll():Post[]{
    return this.admin;
}


findOne(id:number):Post{
    const singlePost=this.admin.find(post=>post.id===id);
    if(!singlePost){
        throw new NotFoundException(`Admin with ID ${id} is not Found`);
    }
    return singlePost;
}


create(createAdminData: Omit<Post,'id' | 'createdAt'>): Post{
    const newPost: Post={
        id:this.getNextId(),
        ...createAdminData,
        createdAt:new Date(),
    }
    this.admin.push(newPost);
    return newPost;
}


update(id: number, updateAdminData: Partial<Omit<Post,'id' | 'createdAt'>>): Post{
    const currentIndexToEdit=this.admin.findIndex(
        (post)=>post.id===id,
    );
    if(currentIndexToEdit===-1){
        throw new NotFoundException(`Admin with ID ${id} not found !`)
    }
    this.admin[currentIndexToEdit]={
        ...this.admin[currentIndexToEdit],
        ...updateAdminData,
        updatedAt: new Date(),
    }
    return this.admin[currentIndexToEdit];
}


remove(id:number):{message:string}{
    const currentIndexToDelete = this.admin.findIndex((post)=>post.id===id);
     if(currentIndexToDelete===-1){
        throw new NotFoundException(`Admin with ID ${id} is not found`)
    }
    this.admin.splice(currentIndexToDelete,1)
        return {message:`Admin with ID ${id} has been deleted...`}  
}


private getNextId():number{
    return this.admin.length>0
    ?Math.max(...this.admin.map(post=> post.id))+1:1
}

}

