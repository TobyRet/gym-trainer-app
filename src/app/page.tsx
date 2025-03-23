import { WorkoutInterface } from '@/components/WorkoutInterface';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-xl mb-12">Gym Trainer</h1>
        <WorkoutInterface />
      </main>
    </div>
  );
}
