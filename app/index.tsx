import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Screen from '@/components/Screen';
import Card from '@/components/Card';
import { theme } from '@/constants/theme';
import { supabase } from '@/lib/supabase';

type Task = { id: string; title: string; due_at: string | null; completed: boolean | null };

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [name, setName] = useState('Student');
  const [loading, setLoading] = useState(true);
  useEffect(() => { loadDashboard(); }, []);

  async function loadDashboard() {
    if (!supabase) { setLoading(false); return; }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.replace('/login'); return; }
    const [{ data: profile }, { data: rows }] = await Promise.all([
      supabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle(),
      supabase.from('tasks').select('id,title,due_at,completed').eq('user_id', user.id).order('due_at', { ascending: true }).limit(5),
    ]);
    if (profile?.full_name) setName(profile.full_name.split(' ')[0]);
    if (rows) setTasks(rows);
    setLoading(false);
  }

  async function toggleTask(task: Task) {
    if (!supabase) return;
    const next = !task.completed;
    setTasks(current => current.map(t => t.id === task.id ? { ...t, completed: next } : t));
    const { error } = await supabase.from('tasks').update({ completed: next, updated_at: new Date().toISOString() }).eq('id', task.id);
    if (error) { setTasks(current => current.map(t => t.id === task.id ? task : t)); Alert.alert('MUNI', error.message); }
  }
  async function signOut() { if (supabase) await supabase.auth.signOut(); }

  const displayTasks: Task[] = tasks.length ? tasks : [
    { id:'demo-1', title:'Add your first assignment', due_at:null, completed:false },
    { id:'demo-2', title:'Create a study session', due_at:null, completed:false },
  ];

  return <Screen><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
    <View style={styles.top}><View style={{flex:1}}><Text style={styles.eyebrow}>MINUYAN NATIONAL HIGH SCHOOL</Text><Text style={styles.title}>Hi, {name} 👋</Text><Text style={styles.sub}>Ready to make today count?</Text></View><Pressable onPress={signOut} style={styles.avatar}><Text style={{fontSize:20}}>M</Text></Pressable></View>
    <Card style={styles.hero}><Text style={styles.heroSmall}>YOUR STUDY STREAK</Text><Text style={styles.heroNum}>7 days 🔥</Text><Text style={styles.heroText}>Keep going. You're building a better study habit.</Text></Card>
    <View style={styles.row}><Stat n={String(tasks.filter(t => !t.completed).length)} label="Tasks due" /><Stat n="2" label="Exams soon" /><Stat n="45m" label="Studied" /></View>
    <View style={styles.sectionHead}><Text style={styles.h2}>Today's tasks</Text><Pressable onPress={() => router.push('/planner')}><Text style={styles.link}>See all</Text></Pressable></View>
    {displayTasks.map(task => <Pressable key={task.id} onPress={() => task.id.startsWith('demo') ? router.push('/planner') : toggleTask(task)}><Card style={styles.task}><View style={styles.dot} /><View style={{flex:1}}><Text style={styles.taskTitle}>{task.title}</Text><Text style={styles.muted}>{task.due_at ? new Date(task.due_at).toLocaleString() : 'No deadline yet'}</Text></View><Text style={styles.check}>{task.completed ? '✓' : '○'}</Text></Card></Pressable>)}
    <View style={styles.sectionHead}><Text style={styles.h2}>Quick study</Text></View><View style={styles.quickRow}><Quick icon="🃏" label="Flashcards" /><Quick icon="🧠" label="Quiz me" /><Quick icon="📖" label="Reviewers" /></View>
    {loading && <Text style={styles.muted}>Syncing your MUNI data…</Text>}
  </ScrollView></Screen>;
}
function Stat({n,label}:{n:string;label:string}){return <Card style={styles.stat}><Text style={styles.statN}>{n}</Text><Text style={styles.muted}>{label}</Text></Card>}
function Quick({icon,label}:{icon:string;label:string}){return <Pressable style={styles.quick} onPress={()=>router.push('/study')}><Text style={{fontSize:28}}>{icon}</Text><Text style={styles.quickText}>{label}</Text></Pressable>}
const styles=StyleSheet.create({top:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingTop:8,paddingBottom:22},eyebrow:{fontSize:10,fontWeight:'800',letterSpacing:1.2,color:theme.accent},title:{fontSize:28,fontWeight:'900',color:theme.ink,marginTop:4},sub:{color:theme.muted,marginTop:3},avatar:{width:46,height:46,borderRadius:23,backgroundColor:theme.yellow,alignItems:'center',justifyContent:'center'},hero:{backgroundColor:theme.accent,padding:22,marginBottom:14},heroSmall:{color:'#DCEBDD',fontWeight:'800',fontSize:11,letterSpacing:1},heroNum:{color:'white',fontSize:32,fontWeight:'900',marginTop:5},heroText:{color:'#EAF2EB',marginTop:5,lineHeight:20},row:{flexDirection:'row',gap:9},stat:{flex:1,padding:14},statN:{fontSize:24,fontWeight:'900',color:theme.ink},muted:{fontSize:12,color:theme.muted,marginTop:3},sectionHead:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:25,marginBottom:10},h2:{fontSize:19,fontWeight:'900',color:theme.ink},link:{color:theme.accent,fontWeight:'800'},task:{flexDirection:'row',alignItems:'center',gap:12,marginBottom:9,padding:14},dot:{width:10,height:10,borderRadius:5,backgroundColor:theme.accentSoft},taskTitle:{fontSize:15,fontWeight:'800',color:theme.ink},check:{fontSize:25,color:theme.accent},quickRow:{flexDirection:'row',gap:9},quick:{flex:1,backgroundColor:theme.card,borderWidth:1,borderColor:theme.border,borderRadius:18,padding:14,alignItems:'center',gap:8},quickText:{fontWeight:'800',fontSize:12,color:theme.ink}});
