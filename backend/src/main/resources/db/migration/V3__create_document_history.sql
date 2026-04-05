CREATE TABLE document_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    session_id UUID REFERENCES document_sessions(id) ON DELETE SET NULL,
    delta JSONB NOT NULL,
    applied_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_history_document_id ON document_history(document_id);