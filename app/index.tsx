import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Screen from '@/components/Screen';
import Card from '@/components/Card';
import { theme } from '@/constants/theme';

const tasks = [
  ['Math', 'Finish algebra worksheet', 'Today • 4:00 PM'],
  ['Science', 'Review photosynthesis', 'Tomorrow • 7:00 PM'],
  ['English', 'Research paper outline', 'Nov 2 • 11:59 PM']
];

export default function Home() {
  const [done, setDone] = useState(false);
  return <Screen><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
    <View style={styles.top}><View><Text style={styles.eyebrow}>MINUYAN NATIONAL HIGH SCHOOL</Text><Text style={styles.title}>Hi, Student 👋</Text><Text style={styles.sub}>Ready to make today count?</Text></View><View style={styles.avatar}><Text style={{ fontSize: 20 }}>M</Text></View></View>
    <Card style={styles.hero}><Text style={styles.heroSmall}>YOUR STUDY STREAK</Text><Text style={styles.heroNum}>7 days 🔥</Text><Text style={styles.heroText}>Keep going. You're building a better study habit.</Text></Card>
    <View style={styles.row}><Stat n="3" label="Tasks due" /><Stat n="2" label="Exams soon" /><Stat n="45m" label="Studied" /></View>
    <View style={styles.sectionHead}><Text style={styles.h2}>Today's tasks</Text><Pressable onPress={() => router.push('/planner')}><Text style={styles.link}>See all</Text></Pressable></View>
    {tasks.map((task, i) => <Pressable key={task[1]} onPress={() => i === 0 && setDone(v => !v)}><Card style={styles.task}><View style={[styles.dot, { backgroundColor: i === 0 ? theme.yellow : theme.accentSoft }]} /><View style={{ flex: 1 }}><Text style={styles.subject}>{task[0]}</Text><Text style={styles.taskTitle}>{task[1]}</Text><Text style={styles.muted}>{task[2]}</Text></View><Text style={styles.check}>{i === 0 && done ? '✓' : '○'}</Text></Card></Pressable>)}
    <View style={styles.sectionHead}><Text style={styles.h2}>Quick study</Text></View><View style={styles.quickRow}><Quick icon="🃏" label="Flashcards" /><Quick icon="🧠" label="Quiz me" /><Quick icon="📖" label="Reviewers" /></View>
  </ScrollView></Screen>;
}
function Stat({ n, label }: { n: string; label: string }) { return <Card style={styles.stat}><Text style={styles.statN}>{n}</Text><Text style={styles.muted}>{label}</Text></Card>; }
function Quick({ icon, label }: { icon: string; label: string }) { return <Pressable style={styles.quick} onPress={() => router.push('/study')}><Text style={{ fontSize: 28 }}>{icon}</Text><Text style={styles.quickText}>{label}</Text></Pressable>; }

const styles = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, paddingBottom: 22 }, eyebrow: { fontSize: 10, fontWeight: '800', letterSpacing: 1.2, color: theme.accent }, title: { fontSize: 28, fontWeight: '900', color: theme.ink, marginTop: 4 }, sub: { color: theme.muted, marginTop: 3 }, avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: theme.yellow, alignItems: 'center', justifyContent: 'center' }, hero: { backgroundColor: theme.accent, padding: 22, marginBottom: 14 }, heroSmall: { color: '#DCEBDD', fontWeight: '800', fontSize: 11, letterSpacing: 1 }, heroNum: { color: 'white', fontSize: 32, fontWeight: '900', marginTop: 5 }, heroText: { color: '#EAF2EB', marginTop: 5, lineHeight: 20 }, row: { flexDirection: 'row', gap: 9 }, stat: { flex: 1, padding: 14 }, statN: { fontSize: 24, fontWeight: '900', color: theme.ink }, muted: { fontSize: 12, color: theme.muted, marginTop: 3 }, sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25, marginBottom: 10 }, h2: { fontSize: 19, fontWeight: '900', color: theme.ink }, link: { color: theme.accent, fontWeight: '800' }, task: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 9, padding: 14 }, dot: { width: 10, height: 10, borderRadius: 5 }, subject: { fontSize: 11, fontWeight: '800', color: theme.accent }, taskTitle: { fontSize: 15, fontWeight: '800', color: theme.ink }, check: { fontSize: 25, color: theme.accent }, quickRow: { flexDirection: 'row', gap: 9 }, quick: { flex: 1, backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border, borderRadius: 18, padding: 14, alignItems: 'center', gap: 8 }, quickText: { fontWeight: '800', fontSize: 12, color: theme.ink }
});
