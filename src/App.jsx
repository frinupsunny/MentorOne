import CoordinatorLayout from "./layouts/CoordinatorLayout";

function App() {
  return (
    <CoordinatorLayout>
      <div className="p-6">

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8">
          <h2 className="text-2xl font-semibold text-white">
            Coordinator Dashboard
          </h2>

          <p className="mt-2 text-slate-400">
            Dashboard content will be added next.
          </p>
        </div>

      </div>
    </CoordinatorLayout>
  );
}

export default App;