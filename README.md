# Task Manager

A modern, responsive task management application built with Vue.js 3, featuring a clean interface for creating, organizing, and tracking tasks with categories and priorities.

## 🚀 Features

### Core Features
- **Task Management**: Create, read, update, and delete tasks
- **Category System**: Organize tasks with customizable categories
- **Priority Levels**: Set task priorities (Low, Medium, High)
- **Status Tracking**: Mark tasks as completed or pending
- **Due Dates**: Set and track task deadlines
- **Image Support**: Attach images to tasks with fallback handling
- **Responsive Design**: Fully responsive design for all devices

### Advanced Features
- **Real-time Status Updates**: Toggle task completion with immediate UI feedback
- **Pagination**: Efficient handling of large task lists
- **Loading States**: Skeleton loaders for better UX
- **Form Validation**: Client-side validation with error messages
- **Modal Dialogs**: Clean overlay system for task creation and editing
- **Navigation**: Intuitive routing with Vue Router
- **State Management**: Centralized state with Pinia

## 🛠️ Tech Stack

- **Frontend Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **HTTP Client**: Axios
- **UI Components**: Headless UI
- **Icons**: Heroicons

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- API endpoint with Supabase/PostgREST backend

## 🚀 Setup and Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd task-manager
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=your_api_base_url
VITE_API_KEY=your_api_key
```

**Example for Supabase:**
```env
VITE_API_URL=https://your-project.supabase.co/rest/v1
VITE_API_KEY=your_supabase_anon_key
```

### 4. Run the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
```

## 🏗️ Framework Choice Justification

### Why Vue.js over React?

**Vue.js was chosen for the following reasons:**

1. **Learning Curve**: Vue's template syntax is more intuitive for developers familiar with HTML
2. **Composition API**: Provides better TypeScript support and code organization
3. **Built-in Features**: Vue Router and state management are more integrated
4. **Performance**: Smaller bundle size and better runtime performance
5. **Developer Experience**: Excellent dev tools and hot reload
6. **Template Syntax**: More readable and maintainable than JSX

## 🏛️ State Management Approach

### Pinia Store Architecture

The application uses **Pinia** for state management with two main stores:

#### 1. Task Store (`taskStore.js`)
```javascript
// Manages all task-related state and operations
- tasks: Array of task objects
- loading: Boolean for loading states
- error: Error handling
- pagination: Pagination metadata
- CRUD operations: fetchTasks, createTask, updateTask, deleteTask
```

#### 2. Categories Store (`categoriesStore.js`)
```javascript
// Manages category data
- categories: Array of category objects
- loading: Boolean for loading states
- error: Error handling
- fetchCategories: API call to get categories
```

### Benefits of Pinia over Vuex:
- **TypeScript Support**: Better type inference
- **Simpler API**: Less boilerplate code
- **Composition API**: Better integration with Vue 3
- **DevTools**: Excellent debugging experience

## 🧩 Component Architecture

### Component Hierarchy
```
App.vue
└── Router View
    └── MainLayout.vue
        └── SideBar.vue
        └── Router View
            ├── TaskList.vue
            │   ├── TaskCard.vue
            │   ├── SkeletonTaskCard.vue
            │   ├── Pagination.vue
            │   └── Overlay.vue
            └── TaskDetails.vue
                ├── SkeletonTaskDetails.vue
                └── Overlay.vue
```

### UI Components (`/components/UI/`)
- **Button.vue**: Reusable button with color variants
- **Input.vue**: Form input component
- **Select.vue**: Dropdown select component
- **Toggle.vue**: Switch/toggle component
- **StatusLamp.vue**: Status indicator with animation
- **Pagination.vue**: Page navigation component
- **Overlay.vue**: Modal dialog component

### Page Components (`/Pages/`)
- **TaskList.vue**: Main task listing with filtering and creation
- **TaskDetails.vue**: Individual task view with editing capabilities

### Layout Components (`/Layout/`)
- **MainLayout.vue**: Root layout with sidebar
- **SideBar.vue**: Navigation sidebar

## 🔧 API Integration

### Axios Configuration (`/Api/axios.js`)
```javascript
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        apiKey: import.meta.env.VITE_API_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
    }
});
```

### API Endpoints Used
- `GET /tasks` - Fetch tasks with pagination and filtering
- `GET /tasks?id=eq.{id}` - Fetch single task
- `POST /tasks` - Create new task
- `PATCH /tasks?id=eq.{id}` - Update task
- `DELETE /tasks?id=eq.{id}` - Delete task
- `GET /categories` - Fetch categories

## 🎨 Styling and Design

### Tailwind CSS Configuration
- **Utility-first approach**: Rapid development with utility classes
- **Responsive design**: Mobile-first approach with breakpoints
- **Custom animations**: Ripple effects for status indicators
- **Color system**: Consistent color palette throughout

### Design Principles
- **Clean Interface**: Minimalist design with focus on functionality
- **Accessibility**: Proper contrast ratios and keyboard navigation
- **Loading States**: Skeleton loaders for better perceived performance
- **Error Handling**: User-friendly error messages and fallbacks

## 🚀 Features Implementation

### Core Features
✅ **Task CRUD Operations**
- Create tasks with title, description, category, priority, and due date
- View task details in dedicated page
- Edit existing tasks with form validation
- Delete tasks with confirmation dialog

✅ **Category Management**
- Dynamic category loading from API
- Category icons with custom colors
- Category selection in task forms

✅ **Priority System**
- Three priority levels: Low, Medium, High
- Visual priority indicators
- Priority-based task organization

✅ **Status Management**
- Toggle task completion status
- Visual status indicators with animations
- Real-time status updates

### Advanced Features
✅ **Image Handling**
- Task image display with loading states
- Error fallback for missing images
- Responsive image sizing

✅ **Pagination**
- Efficient task list pagination
- Smooth page transitions
- Scroll-to-top on page change

✅ **Form Validation**
- Client-side validation for required fields
- Real-time error feedback
- Form state management

✅ **Loading States**
- Skeleton loaders for better UX
- Loading indicators for async operations
- Error state handling

## 🖼️ Screenshots

### Task List View
![Task List](/public/screenshots/TaskList.png)

### Task Details View
![Task Details](/public/screenshots/TaskDetails.png)

### Add/Edit Task Form
![Overlay Form](/public/screenshots/EditTask.png)


## 🔍 Known Limitations

### Current Limitations
1. **No Search Functionality**: Tasks cannot be searched or filtered by text
2. **No Bulk Operations**: Cannot select and perform actions on multiple tasks
3. **No Drag & Drop**: Tasks cannot be reordered via drag and drop
4. **No File Upload**: Images must be provided via URL, no direct upload
5. **No User Authentication**: No user accounts or data isolation
6. **No Offline Support**: Requires internet connection to function
7. **No Data Export**: Cannot export tasks to external formats
8. **Limited Filtering**: No advanced filtering options (date ranges, etc.)

### Future Enhancements
- Search and filter functionality
- Bulk task operations
- File upload for images
- User authentication system
- Offline support with local storage
- Data export capabilities
- Advanced filtering and sorting
- Task templates
- Recurring tasks
- Task dependencies
- Time tracking
- Notifications system

## 🧪 Development

### Project Structure
```
src/
├── Api/                 # API configuration
├── assets/              # Static assets
├── components/          # Reusable components
│   └── UI/             # UI component library
├── Layout/              # Layout components
├── Pages/               # Page components
├── Router/              # Vue Router configuration
├── Stores/              # Pinia stores
├── App.vue              # Root component
├── main.js              # Application entry point
└── style.css            # Global styles
```

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using Vue.js 3 and modern web technologies**