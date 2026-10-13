import React from 'react';
import { Award, Sparkles, Shield, Trophy, Star, CheckCircle, Zap } from 'lucide-react';

interface AcademicBadgeIconProps {
  badgeId?: string;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  unlocked?: boolean;
  image?: string;
  onClick?: () => void;
}

export const AcademicBadgeIcon: React.FC<AcademicBadgeIconProps> = ({
  badgeId = 'b_default',
  title = 'Академический Бэйдж',
  size = 'md',
  className = '',
  unlocked = true,
  image,
  onClick
}) => {
  const sizeMap = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-lg'
  };

  const iconSizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const getGradient = (id: string) => {
    if (id.includes('vibe') || id.includes('code')) return 'from-violet-500 via-indigo-600 to-purple-800 border-indigo-400/50 shadow-indigo-500/30';
    if (id.includes('web') || id.includes('architect')) return 'from-cyan-500 via-blue-600 to-indigo-800 border-cyan-400/50 shadow-cyan-500/30';
    if (id.includes('ux') || id.includes('design')) return 'from-pink-500 via-rose-600 to-purple-800 border-pink-400/50 shadow-pink-500/30';
    if (id.includes('motion')) return 'from-amber-500 via-orange-600 to-red-800 border-amber-400/50 shadow-amber-500/30';
    if (id.includes('scroll') || id.includes('story')) return 'from-emerald-500 via-teal-600 to-cyan-800 border-emerald-400/50 shadow-emerald-500/30';
    if (id.includes('creative') || id.includes('tech')) return 'from-fuchsia-500 via-purple-600 to-indigo-900 border-fuchsia-400/50 shadow-fuchsia-500/30';
    if (id.includes('wow') || id.includes('master')) return 'from-yellow-400 via-amber-500 to-orange-700 border-yellow-300/60 shadow-yellow-500/40';
    return 'from-sky-500 via-blue-600 to-indigo-800 border-blue-400/50 shadow-blue-500/30';
  };

  return (
    <div
      onClick={onClick}
      className={`relative group inline-flex flex-col items-center justify-center ${className} ${onClick ? 'cursor-pointer' : ''}`}
      title={title}
    >
      <div
        className={`relative ${sizeMap[size]} rounded-2xl bg-gradient-to-br ${getGradient(badgeId)} p-0.5 border shadow-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl overflow-hidden`}
      >
        {image && image.trim() !== '' ? (
          <img src={image} alt={title} className="w-full h-full object-cover rounded-[14px]" />
        ) : (
          <div className="w-full h-full rounded-[14px] bg-slate-950/70 backdrop-blur-md flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            <Trophy className={`${iconSizeMap[size]} text-amber-300 drop-shadow`} />
            <Sparkles className="w-3 h-3 absolute top-1 right-1 text-white/70 animate-pulse" />
          </div>
        )}

        {unlocked && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
            <CheckCircle className="w-2.5 h-2.5 text-white" />
          </div>
        )}
      </div>
      {title && size !== 'sm' && (
        <span className="text-[11px] font-semibold text-slate-300 mt-1 max-w-[100px] truncate text-center group-hover:text-white transition-colors">
          {title}
        </span>
      )}
    </div>
  );
};
