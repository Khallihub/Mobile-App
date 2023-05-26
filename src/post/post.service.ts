import { Injectable } from '@nestjs/common';
import { postDto } from './postDto/post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { POST } from './post.model';

@Injectable()
export class PostService {
  constructor(@InjectModel('post') private post: Model<POST>) {}

  rate() {
    throw new Error('Method not implemented.');
  }

  async comment(data: { id: string; comment: string }) {
    const post = await this.post.findById(data.id);
    let temp = post.comments;
    temp.push(data.comment);
    const updatePost = await this.post.findByIdAndUpdate(
      { _id: data.id },
      { comments: temp },
      { new: true },
    );
    if (updatePost) {
      return 'commented';
    } else {
      return 'failed';
    }
  }
  async like_Unlike(data: { id: string; userName: string }) {
    const post = await this.post.findById(data.id);

    let temp1 = post.likes;
    let temp2 = post.dislikes;
    let bool1 = post.likes.includes(data.userName);
    let bool2 = post.dislikes.includes(data.userName);
    if (!(bool1 || bool2)) {
      post.likes.push(data.userName);
      temp1 = post.likes;
    } else if (bool1 && !bool2) {
      temp1 = post.likes.filter((item) => item !== data.userName);
    } else if (!bool1 && bool2) {
      temp2 = post.dislikes.filter((item) => item !== data.userName);
      post.likes.push(data.userName);
      temp1 = post.likes;
    } else {
      temp1 = post.likes;
    }

    const updatedPost = await this.post.findByIdAndUpdate(
      { _id: data.id },
      { likes: temp1, dislikes: temp2 },
      { new: true },
    );
    if (updatedPost) {
      return true;
    } else {
      return false;
    }
  }
  async update_post(data: {
    id: string;
    userName: string;
    title: string;
    description: string;
    categories: string[];
    sourceURL: string;
  }) {
    // const post = await this.post.findById(data.id);

    const updatedPost = await this.post.findByIdAndUpdate(
      { _id: data.id },
      {
        title: data.title,
        description: data.description,
        categories: data.categories,
        sourceURL: data.sourceURL,
      },
      { new: true },
    );
    if (updatedPost) {
      return true;
    } else {
      return false;
    }
  }
  async dislike_Undislike(data: { id: string; userName: string }) {
    const post = await this.post.findById(data.id);

    let temp1 = post.dislikes;
    let temp2 = post.likes;
    let bool1 = post.likes.includes(data.userName);
    let bool2 = post.dislikes.includes(data.userName);
    if (!(bool1 || bool2)) {
      post.dislikes.push(data.userName);
      temp1 = post.dislikes;
    } else if (!bool1 && bool2) {
      temp1 = post.dislikes.filter((item) => item !== data.userName);
    } else if (bool1 && !bool2) {
      temp2 = post.likes.filter((item) => item !== data.userName);
      post.dislikes.push(data.userName);
      temp1 = post.likes;
    } else {
      temp1 = post.dislikes;
    }

    const updatedPost = await this.post.findByIdAndUpdate(
      { _id: data.id },
      { dislikes: temp1, likes: temp2 },
      { new: true },
    );
    if (updatedPost) {
      return true;
    } else {
      return false;
    }
  }
  async getFeed() {
    const feed = await this.post.find();
    return feed;
  }
  async createPost(dto: postDto) {
    const post = new this.post({
      title: dto.title,
      description: dto.description,
      author: dto.author,
      createdAt: Date.now(),
      categories: dto.categories,
      sourceURL: dto.sourceURL,
      authorName: dto.authorName,
      authorAvatar: dto.authorAvatar,
      
    });
    const result = await post.save();
    return result;
  }

  async deletePost(data: { id: string }) {
    const result = await this.post.findByIdAndDelete(data.id);
    if (result) {
      return true;
    } else {
      return false;
    }
  }
}
