
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

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pronouns: '',
    age: '',
    studentStatus: '',
    fieldOfStudy: '',
    semester: '',
    university: '',
    bipocIdentity: '',
    additionalCategories: '',
    hasCapacity: '',
    intersectionalityKnowledge: '',
    mentorExperience: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await saveMentorData(formData);
      
      if (result.success) {
        alert('Anmeldung erfolgreich! Wir werden uns in Kürze bei dir melden.');
        setFormData({
          name: '',
          email: '',
          pronouns: '',
          age: '',
          studentStatus: '',
          fieldOfStudy: '',
          semester: '',
          university: '',
          bipocIdentity: '',
          additionalCategories: '',
          hasCapacity: '',
          intersectionalityKnowledge: '',
          mentorExperience: '',
        });
      } else {
        console.error('Submission error:', result.error);
        alert('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    }
  };

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Anmeldeformular – Building Bridges - Mentor:innen
      </h1>
      <p className="text-gray-600 mb-8">
        Herzlich willkommen beim Anmeldeformular für die Mentor:innen des Projekts Building Bridges! 
        Wir freuen uns, dass du Interesse an der Mitarbeit in unserem Mentor:innen-Programm zeigst.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Persönliche Informationen</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Vollständiger Name"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="Deine Email-Adresse"
                />
              </div>

              <div>
                <Label htmlFor="pronouns">Pronomen (optional)</Label>
                <Input
                  id="pronouns"
                  value={formData.pronouns}
                  onChange={(e) => setFormData({ ...formData, pronouns: e.target.value })}
                  placeholder="z.B. sie/ihr, er/ihm, they/them"
                />
              </div>

              <div>
                <Label htmlFor="age">Alter (optional)</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="Dein Alter"
                />
              </div>

              <div>
                <Label htmlFor="studentStatus">Studierendenstatus</Label>
                <Input
                  id="studentStatus"
                  value={formData.studentStatus}
                  onChange={(e) => setFormData({ ...formData, studentStatus: e.target.value })}
                  required
                  placeholder="z.B. Bachelor, Master"
                />
              </div>

              <div>
                <Label htmlFor="fieldOfStudy">Studienfach</Label>
                <Input
                  id="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                  required
                  placeholder="Dein Studienfach"
                />
              </div>

              <div>
                <Label htmlFor="semester">Semester</Label>
                <Input
                  id="semester"
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  required
                  placeholder="Aktuelles Semester"
                />
              </div>

              <div>
                <Label htmlFor="university">Universität/Hochschule</Label>
                <Input
                  id="university"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  required
                  placeholder="Name der Universität/Hochschule"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bipocIdentity">BIPoC Person - Selbstbeschreibung</Label>
              <Input
                id="bipocIdentity"
                value={formData.bipocIdentity}
                onChange={(e) => setFormData({ ...formData, bipocIdentity: e.target.value })}
                required
                placeholder="z.B. Ich bin eine Schwarze Person / jüdisch / türkisch, etc."
              />
            </div>

            <div>
              <Label htmlFor="additionalCategories">Weitere zu berücksichtigende Kategorien</Label>
              <Input
                id="additionalCategories"
                value={formData.additionalCategories}
                onChange={(e) => setFormData({ ...formData, additionalCategories: e.target.value })}
                placeholder="z.B. queer, Arbeiter:innenkind, neurodivergent"
              />
            </div>

            <div>
              <Label>Kapazitäten mit bis zu 50 Stunden im Projektzeitraum 09 2025 – 09 2026?</Label>
              <RadioGroup
                value={formData.hasCapacity}
                onValueChange={(value) => setFormData({ ...formData, hasCapacity: value })}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="capacity-yes" />
                  <Label htmlFor="capacity-yes">Ja</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="capacity-no" />
                  <Label htmlFor="capacity-no">Nein</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Intersektionalität</Label>
              <RadioGroup
                value={formData.intersectionalityKnowledge}
                onValueChange={(value) => setFormData({ ...formData, intersectionalityKnowledge: value })}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="experienced" id="intersectionality-experienced" />
                  <Label htmlFor="intersectionality-experienced">Ich habe mich mit dem Konzept auseinandergesetzt</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="familiar" id="intersectionality-familiar" />
                  <Label htmlFor="intersectionality-familiar">Ich kenne das Konzept</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unfamiliar" id="intersectionality-unfamiliar" />
                  <Label htmlFor="intersectionality-unfamiliar">Ich kenne das Konzept noch nicht</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Mentor:in Erfahrung</Label>
              <RadioGroup
                value={formData.mentorExperience}
                onValueChange={(value) => setFormData({ ...formData, mentorExperience: value })}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="experience-yes" />
                  <Label htmlFor="experience-yes">Ja</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="experience-no" />
                  <Label htmlFor="experience-no">Nein</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="similar" id="experience-similar" />
                  <Label htmlFor="experience-similar">Habe etwas ähnliches gemacht</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full">
              Anmeldung absenden
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
