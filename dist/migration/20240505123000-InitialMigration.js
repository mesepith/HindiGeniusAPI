"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20240505123000Initial = void 0;
class Migration20240505123000Initial {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`google_user_id\` varchar(255) DEFAULT NULL,
                \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`status\` tinyint NOT NULL DEFAULT '1',
                PRIMARY KEY (\`id\`),
                UNIQUE KEY \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)
            ) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
        await queryRunner.query(`
            CREATE TABLE \`chats\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`userId\` int DEFAULT NULL,
                \`session_id\` text NOT NULL,
                \`message\` text NOT NULL,
                \`response\` text,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`status\` tinyint NOT NULL DEFAULT '1',
                \`service_by\` varchar(255) DEFAULT NULL,
                \`ai_model\` varchar(255) DEFAULT NULL,
                \`prompt_tokens\` int DEFAULT NULL,
                \`completion_tokens\` int DEFAULT NULL,
                \`total_tokens\` int DEFAULT NULL,
                \`total_input_cost\` double DEFAULT NULL,
                \`total_output_cost\` double DEFAULT NULL,
                \`total_cost\` double DEFAULT NULL,
                PRIMARY KEY (\`id\`),
                KEY \`FK_ae8951c0a763a060593606b7e2d\` (\`userId\`),
                CONSTRAINT \`FK_ae8951c0a763a060593606b7e2d\` FOREIGN KEY (\`userId\`) REFERENCES \`users\` (\`id\`)
            ) ENGINE=InnoDB AUTO_INCREMENT=213 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
    }
    async down(queryRunner) {
        await queryRunner.query("DROP TABLE \`chats\`");
        await queryRunner.query("DROP TABLE \`users\`");
    }
}
exports.Migration20240505123000Initial = Migration20240505123000Initial;
//# sourceMappingURL=20240505123000-InitialMigration.js.map