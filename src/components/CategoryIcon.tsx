import React from 'react';
import {
  PenTool,
  Image as ImageIcon,
  Video,
  Mic,
  Code,
  Table,
  Palette,
  Share2,
  GraduationCap,
  Briefcase,
  MessageSquare,
  Megaphone,
  Music,
  Box,
  Mail,
  ShoppingBag,
  FileText,
  Languages,
  ShieldCheck,
  Airplay,
  Gamepad2,
  HeartPulse,
  Coins,
  Home,
  Zap,
  Sparkles
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'PenTool':
      return <PenTool className={className} />;
    case 'Image':
      return <ImageIcon className={className} />;
    case 'Video':
      return <Video className={className} />;
    case 'Mic':
      return <Mic className={className} />;
    case 'Code':
      return <Code className={className} />;
    case 'Table':
      return <Table className={className} />;
    case 'Palette':
      return <Palette className={className} />;
    case 'Share2':
      return <Share2 className={className} />;
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'MessageSquare':
      return <MessageSquare className={className} />;
    case 'Megaphone':
      return <Megaphone className={className} />;
    case 'Music':
      return <Music className={className} />;
    case 'Box':
      return <Box className={className} />;
    case 'Mail':
      return <Mail className={className} />;
    case 'ShoppingBag':
      return <ShoppingBag className={className} />;
    case 'FileText':
      return <FileText className={className} />;
    case 'Languages':
      return <Languages className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Airplay':
      return <Airplay className={className} />;
    case 'Gamepad2':
      return <Gamepad2 className={className} />;
    case 'HeartPulse':
      return <HeartPulse className={className} />;
    case 'Coins':
      return <Coins className={className} />;
    case 'Home':
      return <Home className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};
