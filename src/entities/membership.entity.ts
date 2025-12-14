import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';
import { Team } from './team.entity';
import { Workspace } from './workspace.entity';

@Entity('memberships')
export class Membership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  gid: string;

  @Column({ nullable: true })
  accessLevel: string;

  @Column({ type: 'boolean', default: false })
  writeAccess: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @ManyToOne(() => Project, { nullable: true })
  @JoinColumn()
  parent: Project;

  @ManyToOne(() => User)
  @JoinColumn()
  member: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  user: User;
}

@Entity('project_memberships')
export class ProjectMembership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  gid: string;

  @Column({ nullable: true })
  accessLevel: string;

  @Column({ type: 'boolean', default: false })
  writeAccess: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Project)
  @JoinColumn()
  project: Project;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}

@Entity('team_memberships')
export class TeamMembership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  gid: string;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @Column({ type: 'boolean', default: false })
  isGuest: boolean;

  @Column({ type: 'boolean', default: false })
  isLimitedAccess: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Team, { onDelete: 'CASCADE' })
  @JoinColumn()
  team: Team;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}

@Entity('workspace_memberships')
export class WorkspaceMembership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  gid: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @Column({ type: 'boolean', default: false })
  isGuest: boolean;

  @Column({ type: 'boolean', default: false })
  isViewOnly: boolean;

  @Column({ type: 'jsonb', nullable: true })
  vacationDates: any;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Workspace)
  @JoinColumn()
  workspace: Workspace;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}

