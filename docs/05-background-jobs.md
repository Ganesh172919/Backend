# 05 — Background jobs (queues)

## Why queues exist
Some work should not block the API response:
- emails/sms
- generating reports
- webhook delivery
- AI inference on large inputs

## Core concepts
- Producer: API enqueues a job
- Broker: queue system (Redis/RabbitMQ/Kafka/SQS)
- Worker: consumes jobs and does the work

## Reliability essentials
- At-least-once delivery → duplicates can happen
- Make jobs idempotent
- Add retries with backoff
- Use a dead-letter queue for poison messages
