# Employee Management Application

A modern Angular application for managing employee data, built with Angular, NgRx, and RxJS. This application demonstrates best practices in state management, reactive programming, and component architecture.

## Features

- **Users List View**
  - Display users with filterable list
  - Quick search by name, email, or role
  - Status indicators for active/inactive users

- **USer Details View**
  - Comprehensive user information display
  - Edit functionality with form validation
  - Real-time updates across views

- **State Management**
  - Centralized state management with NgRx
  - Persistent storage using localStorage
  - Optimistic updates for better UX

## Technology Stack

- Angular 17
- NgRx for state management
- RxJS for reactive programming
- Angular Material UI components
- SCSS for styling
- Jasmine & Karma for testing

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17 or higher)

## Installation

1. Clone the repository:
```bash
git clone `https://github.com/Userlane/candidate-task-angular.git`
cd candidate-task-angular
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── store/           # NgRx store configuration
│   │   └── users/       # User state management
│   │       ├── users.actions.ts    # Action definitions
│   │       ├── users.effect.ts     # Side effects handling
│   │       ├── users.reducer.ts    # State updates logic
│   │       └── users.selector.ts   # State selection
│   │
│   ├── users/          # Users feature module
│   │   ├── components/  # Reusable user components
│   │   ├── models/      # User-related interfaces and types
│   │   ├── resolvers/   # Route resolvers
│   │   ├── services/    # User data services
│   │   ├── views/       # User page components
│   │   ├── users.module.ts          # Users module definition
│   │   └── users-routing.module.ts  # Users routing configuration
│   │
│   ├── app.component.html   # Root component template
│   ├── app.component.scss   # Root component styles
│   ├── app.component.ts     # Root component logic
│   ├── app.module.ts        # Root module definition
│   └── app-routing.module.ts# Root routing configuration
```

## State Management

The application uses NgRx for state management with the following features:

- Action-based state updates
- Selector-based view updates
- Effects for side effects
- Local storage persistence

## Testing

Run the test suite:

```bash
ng test
```

The application includes unit tests for:
- Components
- Services
- Store (reducers, selectors, effects)

## Build

Generate a production build:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Development Workflow

1. **Starting Development**
  - Run `ng serve` for a dev server
  - Make changes and see live updates

2. **Creating New Components**
   ```bash
   ng generate component [path]
   ```

3. **Working with State**
  - Add new user actions in `store/users/users.actions.ts`
  - Update user reducers in `store/users/users.reducer.ts`
  - Create user selectors in `store/users/users.selectors.ts`
  - Add a new user effect in `store/users/users.effect.ts`

4. **Running Tests**
  - Unit tests: `ng test`
  - Coverage report: `ng test --code-coverage`

## Additional Information

- The application uses mock data stored in `assets/data/users.json`
- Local storage is used to persist state across page reloads
- The UI is styled using Tailwind, Angular Material UI and custom SCSS
