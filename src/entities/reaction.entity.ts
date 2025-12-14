import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';

@Entity('reactions')
export class Reaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  gid: string;

  @Column()
  emojiBase: string; // e.g., "thumbsup", "heart"

  @Column({ nullable: true })
  resourceSubtype: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Task, { nullable: true })
  @JoinColumn()
  target: Task;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}

