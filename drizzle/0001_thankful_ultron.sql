CREATE TABLE `budgets` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`monthlyConsumption` int NOT NULL,
	`roofArea` int NOT NULL,
	`roofType` varchar(100) NOT NULL,
	`location` varchar(255) NOT NULL,
	`estimatedCost` int,
	`estimatedMonthlySavings` int,
	`paybackPeriodMonths` int,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `budgets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contacts` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `contacts_id` PRIMARY KEY(`id`)
);
