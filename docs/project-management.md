# HeartGuard Project Management Documentation

## Project Board

The project will use a GitHub Projects Kanban board named:

HeartGuard Development Board

## Board Columns

- Backlog
- Ready
- In Progress
- In Review
- Testing
- Done
- Blocked

## Column Purpose

| Column      | Purpose                                                                            |
| ----------- | ---------------------------------------------------------------------------------- |
| Backlog     | Planned tasks that are not yet ready to start                                      |
| Ready       | Approved tasks ready for development                                               |
| In Progress | Tasks currently being worked on                                                    |
| In Review   | Tasks waiting for review                                                           |
| Testing     | Completed tasks being tested                                                       |
| Done        | Finished and approved tasks                                                        |
| Blocked     | Tasks waiting on missing information, setup, dataset, Firebase config, or approval |

## Labels

- planning
- documentation
- frontend
- backend
- firebase
- machine-learning
- testing
- devops
- ui-design
- bug
- enhancement
- priority-high
- priority-medium
- priority-low

## Milestones

- Milestone 1: Planning Complete
- Milestone 2: Dataset and ML Model Complete
- Milestone 3: System Design Complete
- Milestone 4: Frontend UI Complete
- Milestone 5: Backend and Firebase Complete
- Milestone 6: Testing and Deployment Complete
- Milestone 7: Final Documentation Complete

## Solo Project Team Roles

This project is developed as a solo software engineering project. Although one developer is responsible for all implementation work, responsibilities are separated to demonstrate a complete software engineering process.

| Role Area                 | Assigned To    | Responsibilities                                                                    |
| ------------------------- | -------------- | ----------------------------------------------------------------------------------- |
| Project Manager           | Abraham Barasa | Define scope, manage project board, track milestones, organise tasks                |
| Requirements Analyst      | Abraham Barasa | Write problem statement, users, requirements, user stories, and acceptance criteria |
| UI/UX Designer            | Abraham Barasa | Inspect Figma design, design screens, ensure usability and responsiveness           |
| Frontend Developer        | Abraham Barasa | Build React, TypeScript, and Vite frontend                                          |
| Backend Developer         | Abraham Barasa | Build FastAPI backend and API endpoints                                             |
| Machine Learning Engineer | Abraham Barasa | Prepare dataset, train models, evaluate model, and save final pipeline              |
| Firebase Engineer         | Abraham Barasa | Configure Firebase Auth, Firestore, Hosting, and security rules                     |
| Database Designer         | Abraham Barasa | Design Firestore collections, indexes, and data relationships                       |
| QA/Test Engineer          | Abraham Barasa | Write unit tests, integration tests, ML tests, and run acceptance testing           |
| DevOps Engineer           | Abraham Barasa | Manage Git, GitHub, GitHub Actions, deployment, and environment setup               |
| Documentation Lead        | Abraham Barasa | Prepare README, UML diagrams, report, screenshots, and presentation evidence        |

## Git Workflow

The project uses Git and GitHub for version control.

### Main Branches

- main: stable production or submission-ready code
- develop: active integration branch
- feature branches: individual task branches

### Feature Branch Examples

- feature/planning-docs
- feature/requirements-docs
- feature/user-stories-docs
- feature/ml-model
- feature/frontend-ui
- feature/backend-api
- feature/firebase-integration
- feature/testing-ci
- feature/documentation

## Commit Message Examples

- docs: add project problem statement
- docs: add user roles and functional requirements
- feat: scaffold React frontend
- feat: add FastAPI prediction endpoint
- feat: integrate Firebase authentication
- test: add prediction validation tests
- ci: add GitHub Actions test workflow
- docs: add UML diagrams and deployment guide

## Pull Request Rule

Every major feature or documentation update should be developed on a feature branch and merged into develop through a pull request.

This provides evidence of:

- Branching strategy
- Pull requests
- Merge history
- Incremental development
- Version control discipline
