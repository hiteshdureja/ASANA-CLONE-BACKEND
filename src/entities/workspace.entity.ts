import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';
import { Team } from './team.entity';

@Entity('workspaces')
export class Workspace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  gid: string;

  @Column()
  name: string;

  @Column({ type: 'boolean', default: false })
  isOrganization: boolean;

  @Column({ type: 'simple-array', nullable: true })
  emailDomains: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.workspaces)
  members: User[];

  @OneToMany(() => Project, (project) => project.workspace)
  projects: Project[];

  @OneToMany(() => Team, (team) => team.workspace)
  teams: Team[];
}

