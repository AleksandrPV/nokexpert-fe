import { NgModule } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import {
  Phone, Mail, MapPin, Clock, ChevronDown, ChevronRight, ChevronUp, ChevronLeft,
  Check, CircleCheck, CheckCircle, X, CircleX, CircleAlert, Info,
  Building2, HardHat, Shield, ShieldCheck, FileText, Users, Award, Star,
  ArrowRight, ArrowLeft, ArrowUpRight, ExternalLink, Menu, Search,
  MessageCircle, Send, Zap, Target, ChartBar, TrendingUp, GraduationCap,
  Eye, BookOpen, Calendar, CreditCard, Briefcase, House,
  Siren, LifeBuoy, Flame, HeartPulse, TriangleAlert, UserCheck,
  ListChecks, ClipboardList, BadgeCheck, Compass, Layers, Scale, BarChart3,
  Wrench, FileCheck, Truck, Hammer, PenTool, Ruler, Settings, Globe, Lock,
  Lightbulb, Timer, Package, CircleDot, Tag, CircleHelp, LayoutGrid,
  Headphones, Monitor, Smartphone, Play, Database, RefreshCw, Activity,
  Trophy, Sparkles, Landmark, Factory, Repeat, Brain, Cpu,
  // Additional icons used across pages
  Library, Building, FileQuestion, Files, FolderOpen, Gauge, Grid3x3,
  History, Pencil, PencilRuler, Rocket, SearchX, ShieldOff, User, UserX,
  ClipboardCheck, Dumbbell, FileBadge, AlertCircle, AlertTriangle,
  CalendarClock, CalendarX, SquareCheck, EyeOff, FilePlus, FileX,
  Focus, FolderCheck, IdCard, List, Puzzle, ShieldAlert,
  Scan, Shuffle, Copy, MessageSquare, Printer,
  LogIn, LogOut, LayoutDashboard,
} from 'lucide-angular';

const ICONS = {
  Phone, Mail, MapPin, Clock, ChevronDown, ChevronRight, ChevronUp, ChevronLeft,
  Check, CircleCheck, CheckCircle, X, CircleX, CircleAlert, Info,
  Building2, HardHat, Shield, ShieldCheck, FileText, Users, Award, Star,
  ArrowRight, ArrowLeft, ArrowUpRight, ExternalLink, Menu, Search,
  MessageCircle, Send, Zap, Target, ChartBar, TrendingUp, GraduationCap,
  Eye, BookOpen, Calendar, CreditCard, Briefcase, House,
  Siren, LifeBuoy, Flame, HeartPulse, TriangleAlert, UserCheck,
  ListChecks, ClipboardList, BadgeCheck, Compass, Layers, Scale, BarChart3,
  Wrench, FileCheck, Truck, Hammer, PenTool, Ruler, Settings, Globe, Lock,
  Lightbulb, Timer, Package, CircleDot, Tag, CircleHelp, LayoutGrid,
  Headphones, Monitor, Smartphone, Play, Database, RefreshCw, Activity,
  Trophy, Sparkles, Landmark, Factory, Repeat, Brain, Cpu,
  Library, Building, FileQuestion, Files, FolderOpen, Gauge, Grid3x3,
  History, Pencil, PencilRuler, Rocket, SearchX, ShieldOff, User, UserX,
  ClipboardCheck, Dumbbell, FileBadge, AlertCircle, AlertTriangle,
  CalendarClock, CalendarX, SquareCheck, EyeOff, FilePlus, FileX,
  Focus, FolderCheck, IdCard, List, Puzzle, ShieldAlert,
  Scan, Shuffle, Copy, MessageSquare, Printer,
  LogIn, LogOut, LayoutDashboard,
};

@NgModule({
  imports: [LucideAngularModule.pick(ICONS)],
  exports: [LucideAngularModule],
})
export class IconModule {}
