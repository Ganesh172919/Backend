# 06 — AI integration (LLMs + backend)

## The safe pattern
Treat AI as an external dependency:
- validate inputs
- timeouts + retries
- permissions checks
- structured logging (don’t log secrets/PII)

## Common integration modes
1) Direct provider API
- Backend calls hosted LLM (e.g., Azure OpenAI)
- Good for speed and simplicity

2) Self-hosted inference
- Run models on your own GPUs/CPUs
- Useful for data residency and cost control

3) Async inference
- API enqueues job → worker calls model → stores result → client polls/gets webhook

## RAG (Retrieval-Augmented Generation)
Use your data safely by retrieving context:
- store embeddings in a vector DB (pgvector, Pinecone, Milvus)
- retrieve top-k chunks
- pass chunks as context to the model

## Tool/function calling
Let the model request specific backend actions:
- Always validate tool arguments
- Always enforce authz
- Audit every tool call
