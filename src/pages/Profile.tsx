import { useState } from "react";
import { motion } from "framer-motion";
import { User, Edit3, Save, X } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { exerciseSets } from "@/data/exercises";

const Profile = () => {
  const { getProgress } = useProgress();
  const progress = getProgress();
  const completedCount = progress.completedSets.length;

  const rawData = localStorage.getItem("onboarding-data");
  const onboardingData = rawData ? JSON.parse(rawData) : {};

  const [isEditing, setIsEditing] = useState(false);
  const [why, setWhy] = useState(onboardingData.why || "");
  const [draft, setDraft] = useState(why);

  const handleSave = () => {
    setWhy(draft);
    const updated = { ...onboardingData, why: draft };
    localStorage.setItem("onboarding-data", JSON.stringify(updated));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(why);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-background">
      {/* Header */}
      <div className="bg-[#58CC02] px-6 py-12 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white mb-1">
            {onboardingData.name || "Your Profile"}
          </h1>
          <p className="text-white/80 font-bold">
            {completedCount} of {exerciseSets.length} days complete
          </p>
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-card rounded-3xl border-b-4 border-gray-200 p-6"
        >
          <h2 className="text-lg font-black text-foreground mb-4 uppercase tracking-wide">Stats</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-black text-[#58CC02]">{progress.xp}</p>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total XP</p>
            </div>
            <div>
              <p className="text-3xl font-black text-[#58CC02]">{completedCount}</p>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Days Done</p>
            </div>
            <div>
              <p className="text-3xl font-black text-[#58CC02]">
                {exerciseSets.length - completedCount}
              </p>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Remaining</p>
            </div>
          </div>
        </motion.div>

        {/* Why I want this */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-card rounded-3xl border-b-4 border-[#58CC02]/30 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-foreground uppercase tracking-wide">
              Why I Want This
            </h2>
            {!isEditing ? (
              <button
                onClick={() => { setDraft(why); setIsEditing(true); }}
                className="flex items-center gap-1 text-sm font-bold text-[#58CC02] hover:opacity-70 transition-opacity"
              >
                <Edit3 className="w-4 h-4" /> Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 text-sm font-bold text-[#58CC02] hover:opacity-70 transition-opacity"
                >
                  <Save className="w-4 h-4" /> Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1 text-sm font-bold text-muted-foreground hover:opacity-70 transition-opacity"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              </div>
            )}
          </div>

          {!isEditing ? (
            why ? (
              <div className="bg-[#58CC02]/10 border border-[#58CC02]/20 rounded-2xl p-4">
                <p className="text-base font-semibold text-foreground leading-relaxed">
                  "{why}"
                </p>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground font-semibold mb-4">
                  You haven't written your why yet.
                </p>
                <button
                  onClick={() => { setDraft(""); setIsEditing(true); }}
                  className="px-6 py-3 rounded-2xl bg-[#58CC02] text-white font-black text-sm shadow-[0_4px_0_0_#46A302]"
                >
                  WRITE YOUR WHY
                </button>
              </div>
            )
          ) : (
            <div>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="I want to become magnetic because..."
                rows={4}
                className="w-full px-4 py-4 rounded-2xl border-2 border-[#58CC02]/30 bg-[#58CC02]/5 text-foreground font-semibold focus:border-[#58CC02] focus:outline-none transition-colors resize-none text-base leading-relaxed"
              />
              <button
                onClick={handleSave}
                disabled={!draft.trim()}
                className={`w-full mt-3 py-4 rounded-2xl font-black text-lg transition-all ${
                  draft.trim()
                    ? "bg-[#58CC02] text-white shadow-[0_4px_0_0_#46A302]"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                SAVE
              </button>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default Profile;
