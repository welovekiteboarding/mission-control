import { useActivities } from "../services/convex";

export const ActivityFeed = () => {
  const activities = useActivities();

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Activity Feed
          </p>
          <h2 className="text-xl font-semibold text-white">Live Signals</h2>
        </div>
        <span className="rounded-full border border-slate-700 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-400">
          {activities.length} events
        </span>
      </header>
      <div className="mt-4 flex flex-col gap-3">
        {activities.length === 0 ? (
          <p className="text-xs text-slate-500">No activity yet.</p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3"
            >
              <p className="text-xs text-slate-400">{activity.agent}</p>
              <p className="mt-2 text-sm text-slate-200">
                {activity.message}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                {activity.type}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
