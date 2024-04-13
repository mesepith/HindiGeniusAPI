// src/entity/Chat.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity('chats')
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User;

    @Column('text', { name: 'session_id' })
    sessionId: string;

    @Column('text')
    message: string;

    @Column('text', { nullable: true })
    response: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: 'boolean', default: true })
    status: boolean;

    @Column('varchar', { name: 'service_by', nullable: true })
    serviceBy: string;

    @Column('varchar', { name: 'ai_model', nullable: true })
    aiModel: string;

    @Column('int', { name: 'prompt_tokens', nullable: true })
    promptTokens: number;

    @Column('int', { name: 'completion_tokens', nullable: true })
    completionTokens: number;

    @Column('int', { name: 'total_tokens', nullable: true })
    totalTokens: number;
}
