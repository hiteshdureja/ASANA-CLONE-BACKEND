import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Workspace } from './workspace.entity';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  gid: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Workspace, (workspace) => workspace.teams)
  workspace: Workspace;

  @ManyToMany(() => User, (user) => user.workspaces)
  @JoinTable({ name: 'team_memberships' })
  members: User[];

  @OneToMany(() => Project, (project) => project.team)
  projects: Project[];
}

