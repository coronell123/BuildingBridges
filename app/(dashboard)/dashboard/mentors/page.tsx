"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import {
  Settings,
  LogOut,
  UserPlus,
  Lock,
  UserCog,
  AlertCircle,
  UserMinus,
  Mail,
  CheckCircle,
  type LucideIcon,
} from 'lucide-react';
import { db } from '@/lib/db/drizzle';
import { activityLogs, teamMembers, users } from '@/lib/db/schema';
import { desc, eq, and } from 'drizzle-orm';
import { saveMentorData } from '@/lib/actions';

const iconMap: Record<string, LucideIcon> = {
  'SIGN_UP': UserPlus,
  'SIGN_IN': UserCog,
  'SIGN_OUT': LogOut,
  'UPDATE_PASSWORD': Lock,
  'DELETE_ACCOUNT': UserMinus,
  'UPDATE_ACCOUNT': Settings,
  'CREATE_TEAM': UserPlus,
  'REMOVE_TEAM_MEMBER': UserMinus,
  'INVITE_TEAM_MEMBER': Mail,
  'ACCEPT_INVITATION': CheckCircle,
};

function getRelativeTime(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
}

function formatAction(action: string): string {
  switch (action) {
    case 'SIGN_UP':
      return 'You signed up';
    case 'SIGN_IN':
      return 'You signed in';
    case 'SIGN_OUT':
      return 'You signed out';
    case 'UPDATE_PASSWORD':
      return 'You changed your password';
    case 'DELETE_ACCOUNT':
      return 'You deleted your account';
    case 'UPDATE_ACCOUNT':
      return 'You updated your account';
    case 'CREATE_TEAM':
      return 'You created a new team';
    case 'REMOVE_TEAM_MEMBER':
      return 'You removed a team member';
    case 'INVITE_TEAM_MEMBER':
      return 'You invited a team member';
    case 'ACCEPT_INVITATION':
      return 'You accepted an invitation';
    default:
      return 'Unknown action occurred';
  }
}

// Create an Airtable client
const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

export default function MentorsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mentoring</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mentor*in finden</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Wir vermitteln dir eine*n BIPoC Mentor*in, die dich auf deinem Weg berät, 
              unterstützt und inspiriert.
            </p>
            <Button className="bg-[#8c52ff] hover:bg-[#7440e0]">
              Mentor*in anfragen
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meine Mentoring Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Hier findest du eine Übersicht deiner vergangenen und geplanten Mentoring Sessions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
