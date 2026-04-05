CREATE TABLE document_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL UNIQUE,
    permissions VARCHAR(20) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_sessions_document_id ON document_sessions(document_id);
CREATE INDEX idx_sessions_token ON document_sessions(token);