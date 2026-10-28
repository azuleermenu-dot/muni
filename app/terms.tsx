import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { theme } from '@/constants/theme';

export const TERMS_VERSION = '1.0';

export default function Terms() {
  const [accepted, setAccepted] = useState(false);
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.brand}>MUNI</Text>
        <Text style={styles.title}>Terms & Agreements</Text>
        <Text style={styles.updated}>Version {TERMS_VERSION} • October 28, 2026</Text>
        <Text style={styles.intro}>Please read these terms before creating your MUNI account.</Text>
        <Section title="1. Using MUNI">MUNI is a student study-planning and review application. Use it for lawful educational purposes and provide information that is accurate enough for your account to work.</Section>
        <Section title="2. Your account">You are responsible for keeping your password private and for activity performed through your account. Do not share your login credentials with another person.</Section>
        <Section title="3. Your study content">You keep ownership of the notes, flashcards, reviewers, and other content you create. Do not upload content that you do not have permission to use or that violates another person's rights.</Section>
        <Section title="4. School use">MUNI can be configured by different schools. A school's version may have its own administrators, rules, and privacy notices. Follow the rules that apply to the school version you use.</Section>
        <Section title="5. Availability">MUNI is provided to support studying and organization. It is not a replacement for official school records, teacher instructions, or examination requirements.</Section>
        <Section title="6. Safety and abuse">Do not attempt to disrupt the service, access another student's account or data, bypass security controls, or use MUNI to harass or harm others.</Section>
        <Section title="7. Changes">These terms may be updated as MUNI develops. When a material update is made, users may be asked to review and accept the new version before continuing.</Section>
        <Section title="8. Privacy">Your use of MUNI is also governed by the MUNI Privacy Policy. Please review it before accepting these terms.</Section>
        <Text style={styles.note}>This is an open-source school-app template. Each school deploying MUNI should review and adapt these terms with its school administration and appropriate legal/privacy guidance.</Text>
        <Pressable onPress={() => router.push('/privacy')}><Text style={styles.privacyLink}>Read the Privacy Policy →</Text></Pressable>
      </ScrollView>
      <View style={styles.bottom}>
        <Pressable onPress={() => setAccepted(v => !v)} style={styles.checkRow} accessibilityRole="checkbox" accessibilityState={{ checked: accepted }}>
          <View style={[styles.checkbox, accepted && styles.checked]}>{accepted && <Text style={styles.tick}>✓</Text>}</View>
          <Text style={styles.checkText}>I have read and agree to the Terms & Agreements and Privacy Policy.</Text>
        </Pressable>
        <Pressable disabled={!accepted} onPress={() => router.replace('/login?signup=1&termsAccepted=1')} style={[styles.button, !accepted && styles.disabled]}>
          <Text style={styles.buttonText}>Continue to sign up</Text>
        </Pressable>
      </View>
    </View>
  );
}
function Section({ title, children }: { title: string; children: string }) { return <View style={styles.section}><Text style={styles.sectionTitle}>{title}</Text><Text style={styles.body}>{children}</Text></View>; }
const styles = StyleSheet.create({ screen:{flex:1,backgroundColor:theme.bg},content:{padding:24,paddingTop:58,paddingBottom:190},brand:{fontSize:14,fontWeight:'900',letterSpacing:2,color:theme.accent},title:{fontSize:30,fontWeight:'900',color:theme.ink,marginTop:8},updated:{fontSize:12,color:theme.muted,marginTop:5},intro:{fontSize:15,color:theme.ink,lineHeight:22,marginTop:22},section:{marginTop:24},sectionTitle:{fontSize:16,fontWeight:'900',color:theme.ink,marginBottom:7},body:{fontSize:14,color:theme.muted,lineHeight:22},note:{fontSize:12,color:theme.muted,lineHeight:18,marginTop:28},privacyLink:{color:theme.accent,fontWeight:'900',marginTop:18},bottom:{position:'absolute',left:0,right:0,bottom:0,padding:18,backgroundColor:theme.card,borderTopWidth:1,borderTopColor:theme.border},checkRow:{flexDirection:'row',alignItems:'center',gap:10,marginBottom:12},checkbox:{width:24,height:24,borderRadius:7,borderWidth:2,borderColor:theme.accent,alignItems:'center',justifyContent:'center'},checked:{backgroundColor:theme.accent},tick:{color:'white',fontWeight:'900'},checkText:{flex:1,fontSize:12,color:theme.ink,lineHeight:17},button:{backgroundColor:theme.accent,borderRadius:14,padding:16,alignItems:'center'},disabled:{opacity:.45},buttonText:{color:'white',fontWeight:'900',fontSize:15}});
