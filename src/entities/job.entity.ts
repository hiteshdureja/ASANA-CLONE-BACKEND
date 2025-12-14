import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  gid: string;

  @Column({ nullable: true })
  resourceSubtype: string;

  @Column({ nullable: true })
  status: string; // pending, in_progress, succeeded, failed

  @Column({ type: 'jsonb', nullable: true })
  newTask: any;

  @Column({ type: 'jsonb', nullable: true })
  newProject: any;

  @Column({ type: 'jsonb', nullable: true })
  newProjectTemplate: any;

  @Column({ type: 'jsonb', nullable: true })
  newTaskTemplate: any;

  @Column({ type: 'jsonb', nullable: true })
  newResourceExport: any;

  @Column({ type: 'jsonb', nullable: true })
  newGraphExport: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  completedAt: Date;
}

