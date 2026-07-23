# Phase 5 Summary: Testing and DevOps

## Phase Objective

The objective of Phase 5 was to verify the HeartGuard system through automated tests and introduce a continuous integration workflow using free GitHub Actions resources.

This phase focused on confirming that the backend, machine-learning pipeline, and frontend can be validated consistently before code is merged into the main branches.

## Completed Work

### 1. Backend Unit Tests

Backend unit tests were added under:

- `backend/tests/unit/test_prediction_schemas.py`
- `backend/tests/unit/test_prediction_service.py`

The unit tests verify:

- valid prediction input schema creation
- required field validation
- invalid value rejection
- prediction service response structure
- prediction labels
- probability bounds
- probability consistency

Verification command:

```powershell
$env:PYTHONPATH="backend"
pytest backend\tests\unit
```
