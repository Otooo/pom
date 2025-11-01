# Diretórios
BACKEND_DIR=backend
FRONTEND_DIR=frontend

.PHONY: help backend-dev backend-build backend-start frontend-dev frontend-build frontend-preview start

help:
	@echo "Available targets:"
	@echo "  backend-dev        - run backend in dev (nodemon/ts-node)"
	@echo "  backend-build      - build backend (tsc)"
	@echo "  backend-start      - build and start backend (node dist)"
	@echo "  frontend-dev       - run frontend in dev (Vite)"
	@echo "  frontend-build     - build frontend"
	@echo "  frontend-preview   - preview built frontend"
	@echo "  start              - run both backend and frontend dev servers"

backend-dev:
	cd $(BACKEND_DIR) && npm run dev

backend-build:
	cd $(BACKEND_DIR) && npm run build

backend-start: backend-build
	cd $(BACKEND_DIR) && npm start

frontend-dev:
	cd $(FRONTEND_DIR) && npm run dev

frontend-build:
	cd $(FRONTEND_DIR) && npm run build

frontend-preview:
	cd $(FRONTEND_DIR) && (npm run preview || npx vite preview)

# Sobe backend e frontend em dev, em paralelo
start:
	bash -c '(cd $(BACKEND_DIR) && npm run dev) & (cd $(FRONTEND_DIR) && npm run dev) & wait'