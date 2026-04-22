'use client';

import { useState, useEffect } from 'react';
import {
  requestNotificationPermission,
  getNotificationPermission,
  scheduleNotification,
  cancelNotifications,
  saveNotificationTime,
  getNotificationTime,
} from '@/lib/notifications';
import { setAppState, getAppState } from '@/lib/storage';
import type { Translations } from '@/data/i18n';

interface NotificationPanelProps {
  t: Translations;
}

export default function NotificationPanel({ t }: NotificationPanelProps) {
  const [permission, setPermission] = useState<string>('default');
  const [enabled, setEnabled] = useState(false);
  const [time, setTime] = useState('08:00');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setPermission(getNotificationPermission());
    const state = getAppState();
    setEnabled(state.notificationsEnabled);
    setTime(state.notificationTime ?? getNotificationTime());
  }, []);

  const handleToggle = async () => {
    if (!enabled) {
      setSaving(true);
      const granted = await requestNotificationPermission();
      setPermission(getNotificationPermission());
      if (granted) {
        await scheduleNotification({ time });
        setAppState({ notificationsEnabled: true, notificationTime: time });
        saveNotificationTime(time);
        setEnabled(true);
        setFeedback('✅ Notifications scheduled!');
      } else {
        setFeedback('❌ Permission denied. Enable in browser settings.');
      }
      setSaving(false);
    } else {
      cancelNotifications();
      setAppState({ notificationsEnabled: false });
      setEnabled(false);
      setFeedback('🔕 Notifications turned off');
    }
    setTimeout(() => setFeedback(''), 3000);
  };

  const handleTimeChange = async (newTime: string) => {
    setTime(newTime);
    if (enabled) {
      saveNotificationTime(newTime);
      setAppState({ notificationTime: newTime });
      await scheduleNotification({ time: newTime });
      setFeedback('⏰ Reminder updated!');
      setTimeout(() => setFeedback(''), 2500);
    }
  };

  if (permission === 'unsupported') return null;

  return (
    <div className="rounded-2xl bg-dark-700 border border-white/10 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cosmos-500/20 flex items-center justify-center text-xl">
            🔔
          </div>
          <div>
            <p className="text-white font-bold text-sm">{t.dailyReminder}</p>
            <p className="text-white/50 text-xs">Never miss your cosmic reading</p>
          </div>
        </div>

        {/* Toggle */}
        <button
          onClick={handleToggle}
          disabled={saving}
          className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
            enabled ? 'bg-cosmos-500' : 'bg-white/20'
          } disabled:opacity-50`}
          aria-label={enabled ? 'Disable notifications' : 'Enable notifications'}
        >
          <span
            className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${
              enabled ? 'left-8' : 'left-1'
            }`}
          />
        </button>
      </div>

      {enabled && (
        <div className="animate-fade-in">
          <label className="block text-white/60 text-xs mb-1">{t.notificationTime}</label>
          <input
            type="time"
            value={time}
            onChange={(e) => handleTimeChange(e.target.value)}
            className="w-full bg-dark-800 border border-white/20 text-white rounded-xl px-4 py-2 text-sm
                       focus:outline-none focus:border-cosmos-400 transition-colors"
          />
        </div>
      )}

      {feedback && (
        <p className="text-xs mt-3 text-white/70 animate-fade-in">{feedback}</p>
      )}

      {permission === 'denied' && (
        <p className="text-xs text-red-400 mt-2">
          ⚠️ Notifications blocked. Enable them in your browser/OS settings.
        </p>
      )}
    </div>
  );
}
