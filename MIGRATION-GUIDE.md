# Migration Guide: From Hardcoded Data to Supabase Database

This guide provides detailed instructions for migrating the gym website from using hardcoded data to fetching all data from a Supabase database.

## Prerequisites

1. A Supabase account and project set up
2. Node.js and npm installed
3. Access to the project codebase

## Step 1: Environment Setup

1. Ensure your `.env` file is properly configured with Supabase credentials:

```env
# Connect to Supabase via connection pooling
DATABASE_URL="postgresql://postgres.[YOUR_SUPABASE_PROJECT_ID]:[YOUR_PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection to the database. Used for migrations.
DIRECT_URL="postgresql://postgres.[YOUR_SUPABASE_PROJECT_ID]:[YOUR_PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"

# Supabase API credentials
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_SUPABASE_PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
```

2. Install Prisma (if not already installed):

```bash
npm install prisma --save-dev
npm install @prisma/client
```

## Step 2: Database Migration and Seeding

1. Run the migration script to create the database tables and seed initial data:

```bash
node scripts/migrate-to-supabase.js
```

2. Follow the prompts in the script to:
   - Generate Prisma client
   - Run database migrations
   - Seed the database with initial data

3. Verify in the Supabase dashboard that tables have been created and populated correctly

## Step 3: Update Frontend Components

Replace hardcoded data in frontend components with data fetched from Supabase. Use the following pattern:

1. Import the necessary Supabase functions:

```jsx
import { getFunctionName } from "@/lib/supabase"
```

2. Add state for data, loading, and error:

```jsx
const [data, setData] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
```

3. Add a useEffect hook to fetch data when the component mounts:

```jsx
useEffect(() => {
  async function fetchData() {
    try {
      setLoading(true)
      const result = await getFunctionName()
      setData(result || [])
    } catch (err) {
      console.error("Error fetching data:", err)
      setError("Failed to load data")
    } finally {
      setLoading(false)
    }
  }
  
  fetchData()
}, [])
```

4. Add loading and error states to your component:

```jsx
if (loading) {
  return <LoadingComponent />
}

if (error) {
  return <ErrorComponent message={error} />
}
```

5. Use the fetched data in your component:

```jsx
return (
  <div>
    {data.map(item => (
      <ItemComponent key={item.id} item={item} />
    ))}
  </div>
)
```

## Step 4: Update Pages One by One

Follow these steps for each page that needs to be migrated:

1. Memberships Page (`app/memberships/page.tsx`)
2. Trainers Page
3. Meal Plans Page
4. Class Schedule Page
5. Home Page components

## Step 5: Admin Dashboard Development

1. Admin Authentication:
   - The current implementation uses a simple client-side authentication for demo purposes
   - In production, implement proper authentication using Supabase Auth

2. Admin Pages to Implement:
   - Members management
   - Trainers management
   - Meal plans management
   - Memberships management
   - Schedule management

3. Each admin page should include:
   - Table view of existing data
   - Forms for creating and editing data
   - Delete functionality with confirmation
   - Form validation
   - Error handling

## Step 6: Testing and Deployment

1. Test all pages and functionality:
   - Ensure data is displayed correctly
   - Test CRUD operations in the admin dashboard
   - Test error handling when the database is unavailable

2. Deploy the changes:
   - Run Prisma migrations on the production database
   - Deploy the updated frontend code

## Troubleshooting

- **Database connection issues**: Check that your Supabase credentials in `.env` are correct
- **Prisma errors**: Run `npx prisma generate` to ensure the Prisma client is up to date
- **Data format issues**: Ensure the data you're sending to Supabase matches the expected schema
- **Supabase RLS policies**: Check that your Row Level Security policies are correctly configured

## Future Enhancements

1. Implement proper authentication flow with Supabase Auth
2. Add file uploads for images (trainers, meal plans) using Supabase Storage
3. Implement real-time updates using Supabase's real-time subscriptions
4. Add more comprehensive admin analytics dashboard
5. Implement caching for frequently accessed data

## Resources

- [Supabase Documentation](https://supabase.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs) 