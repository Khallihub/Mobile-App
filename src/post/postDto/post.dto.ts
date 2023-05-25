import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class postDto {
    // @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsArray()
    @IsNotEmpty()
    categories: string[]
    
    @IsNotEmpty()
    @IsString()
    sourceURL: string
}