START PASTE (copy everything from here to the END PASTE line and paste it into PowerShell in one go):

New-Item -ItemType Directory -Force -Path .\src | Out-Null

$full = @'
import React, { useState, useEffect, useMemo } from 'react';
import {
LayoutDashboard,
TrendingUp,
CheckCircle2,
AlertCircle,
ChevronRight,
Save,
Edit3,
BarChart3,
FileText,
ShieldCheck,
Settings,
BookOpen,
Truck,
Building2,
Activity,
UserCheck,
Search,
Layers,
MessageSquareQuote,
Megaphone,
XCircle,
Database,
Calendar,
Lock
} from 'lucide-react';

/**

KONFIGURASI SUPABASE
Sila masukkan maklumat dari Project Settings -> API Supabase anda.
Jika dibiarkan kosong, sistem akan berjalan dalam "Mod Demo" secara automatik.
*/
const SUPABASE_URL = "";
const SUPABASE_ANON_KEY = "";
const SECTIONS = [
"Seksyen Kualiti, Majlis & Protokol (SKMP)",
"Seksyen Pentadbiran & Kewangan (SPK)",
"Unit Perpustakaan (LIB)",
"Seksyen Pembangunan & Aset (SPAK)",
"Unit Pembantu Operasi (PO)"
];

// PANGKALAN DATA PRE-SEEDED (150+ Item Representative)
const INITIAL_FULL_DATA = [
// --- SKMP (18 Items) ---
{ sku_name: "Mengurus Majlis Rasmi", sub_sku_name: "Peratus urusan penyediaan Kertas Cadangan penganjuran (14 hari bekerja).", unit: "Peratus", target: 100, actual: 0, section: "Seksyen Kualiti, Majlis & Protokol (SKMP)" },
{ sku_name: "Mengurus Majlis Rasmi", sub_sku_name: "Peratus urusan kerja persiapan dan atur cara pentadbiran (30 hari).", unit: "Peratus", target: 100, actual: 0, section: "Seksyen Kualiti, Majlis & Protokol (SKMP)" },
{ sku_name: "Menyelaras MS ISO 9001:2015", sub_sku_name: "Bilangan penyediaan laporan MS ISO 9001:2015 untuk MKSP.", unit: "Bilangan", target: 8, actual: 0, section: "Seksyen Kualiti, Majlis & Protokol (SKMP)" },
{ sku_name: "Menyelaras MS ISO 9001:2015", sub_sku_name: "Penyediaan dokumen SPK MS ISO 9001:2015 (7 hari).", unit: "Bilangan", target: 25, actual: 0, section: "Seksyen Kualiti, Majlis & Protokol (SKMP)" },
{ sku_name: "Kualiti & Inovasi", sub_sku_name: "Peratus penyelarasan Anugerah Inovasi/Kualiti Kementerian.", unit: "Peratus", target: 100, actual: 0, section: "Seksyen Kualiti, Majlis & Protokol (SKMP)" },
...Array(13).fill(null).map((_, i) => ({
sku_name: "Pengurusan Protokol & Majlis",
sub_sku_name: Sub SKU SKMP #${i + 6}: Penyelarasan teknikal, protokol dan keurusetiaan jabatan.,
unit: "Peratus", target: 100, actual: 0, section: "Seksyen Kualiti, Majlis & Protokol (SKMP)"
})),

// --- SPK (70 Items) ---
{ sku_name: "Sokongan Pentadbiran", sub_sku_name: "Bilangan urusan penyediaan sasaran kerja utama (SKU) Bahagian.", unit: "Bilangan", target: 1, actual: 0, section: "Seksyen Pentadbiran & Kewangan (SPK)" },
{ sku_name: "Sokongan Pentadbiran", sub_sku_name: "Bilangan urusan penyediaan takwim Google Calendar (Setahun).", unit: "Bilangan", target: 1, actual: 0, section: "Seksyen Pentadbiran & Kewangan (SPK)" },
{ sku_name: "Pengurusan Fail", sub_sku_name: "Peratus pembukaan fail baru dan daftar fail (1 hari bekerja).", unit: "Peratus", target: 100, actual: 0, section: "Seksyen Pentadbiran & Kewangan (SPK)" },
...Array(67).fill(null).map((_, i) => ({
sku_name: "Pentadbiran & Kewangan Am",
sub_sku_name: Sub SKU SPK #${i + 4}: Urusan HR, Kewangan, Pentadbiran Fail, dan Urusetia Mesyuarat.,
unit: "Peratus", target: 100, actual: 0, section: "Seksyen Pentadbiran & Kewangan (SPK)"
})),

// --- LIB (15 Items) ---
{ sku_name: "Perkhidmatan Perpustakaan", sub_sku_name: "Peratus Pengkatalogan Bahan Buku Perpustakaan (Setahun).", unit: "Peratus", target: 100, actual: 0, section: "Unit Perpustakaan (LIB)" },
{ sku_name: "Penyelarasan EKSA", sub_sku_name: "Bilangan urusan penyelarasan EKSA KPKM (4 kali setahun).", unit: "Bilangan", target: 4, actual: 0, section: "Unit Perpustakaan (LIB)" },
...Array(13).fill(null).map((_, i) => ({
sku_name: "Pengurusan Maklumat",
sub_sku_name: Sub SKU LIB #${i + 3}: Urusan sistem perpustakaan, pinjaman bahan, dan penyelenggaraan unit.,
unit: "Peratus", target: 100, actual: 0, section: "Unit Perpustakaan (LIB)"
})),

// --- SPAK (50 Items) ---
{ sku_name: "Penyelenggaraan Bangunan", sub_sku_name: "Peratus peruntukan disahkan bagi pengurusan fasiliti Wisma Tani.", unit: "Peratus", target: 100, actual: 0, section: "Seksyen Pembangunan & Aset (SPAK)" },
{ sku_name: "Pengurusan Aset", sub_sku_name: "Peratus pendaftaran aset alih baru (2 minggu dari terima).", unit: "Peratus", target: 100, actual: 0, section: "Seksyen Pembangunan & Aset (SPAK)" },
...Array(48).fill(null).map((_, i) => ({
sku_name: "Pembangunan & Aset",
sub_sku_name: Sub SKU SPAK #${i + 3}: Pemantauan kerosakan, pelabelan aset kerajaan, dan inventori.,
unit: "Peratus", target: 100, actual: 0, section: "Seksyen Pembangunan & Aset (SPAK)"
})),

// --- PO (10 Items) ---
{ sku_name: "Sokongan Operasi", sub_sku_name: "Peratus penghantaran dokumen serahan tangan (1 hari bekerja).", unit: "Peratus", target: 100, actual: 0, section: "Unit Pembantu Operasi (PO)" },
...Array(9).fill(null).map((_, i) => ({
sku_name: "Operasi Harian",
sub_sku_name: Sub SKU PO #${i + 2}: Logistik harian, pengisian buku log kenderaan, dan bantuan am.,
unit: "Peratus", target: 100, actual: 0, section: "Unit Pembantu Operasi (PO)"
}))
];

const App = () => {
const [supabaseClient, setSupabaseClient] = useState(null);
const [kpis, setKpis] = useState(INITIAL_FULL_DATA.map((d, i) => ({ ...d, id: local-${i}, percentage: "0.00" })));
const [remarks, setRemarks] = useState({ text: "Sila pastikan kemas kini data SKU 2026 dilakukan secara berkala demi kelancaran pemantauan pihak pengurusan.", updatedAt: "" });
const [activeSection, setActiveSection] = useState(SECTIONS[0]);
const [isEditing, setIsEditing] = useState(null);
const [isEditingRemarks, setIsEditingRemarks] = useState(false);
const [loading, setLoading] = useState(true);
const [view, setView] = useState('dashboard');
const [saveStatus, setSaveStatus] = useState(null);
const [searchQuery, setSearchQuery] = useState('');
const [isDemo, setIsDemo] = useState(true);

const [formData, setFormData] = useState({ sku_name: '', sub_sku_name: '', unit: 'Peratus', target: 0, actual: 0 });
const [remarksInput, setRemarksInput] = useState("");

// Pemuatan Pustaka Supabase secara dinamik (UMD)
useEffect(() => {
const scriptId = 'supabase-sdk';
if (document.getElementById(scriptId)) return;

const script = document.createElement('script');
script.id = scriptId;
script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js';
script.async = true;

script.onload = () => {
  if (window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      setSupabaseClient(client);
      setIsDemo(false);
    } catch (e) {
      console.warn("Supabase initialization failed:", e);
    }
  }
  setLoading(false);
};

script.onerror = () => {
  console.error("Gagal memuatkan Supabase SDK. Mod Demo diaktifkan.");
  setLoading(false);
};

document.head.appendChild(script);
}, []);

useEffect(() => {
if (!supabaseClient) return;

const initApp = async () => {
  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) await supabaseClient.auth.signInAnonymously();
    await fetchData();
    await fetchRemarks();
  } catch (err) {
    console.error("Auth error:", err);
  }
};

initApp();

const kpiChannel = supabaseClient
  .channel('kpis_changes')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'kpis' }, () => fetchData())
  .subscribe();

const configChannel = supabaseClient
  .channel('config_changes')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'config' }, () => fetchRemarks())
  .subscribe();

return () => {
  supabaseClient.removeChannel(kpiChannel);
  supabaseClient.removeChannel(configChannel);
};
}, [supabaseClient]);

const fetchData = async () => {
if (!supabaseClient) return;
const { data, error } = await supabaseClient.from('kpis').select('*');
if (!error && data && data.length > 0) {
setKpis(data);
} else if (!error && data && data.length === 0) {
await supabaseClient.from('kpis').insert(INITIAL_FULL_DATA);
fetchData();
}
};

const fetchRemarks = async () => {
if (!supabaseClient) return;
const { data } = await supabaseClient.from('config').select('content').eq('id', 'remarks').maybeSingle();
if (data && data.content) {
setRemarks(data.content);
setRemarksInput(data.content.text);
}
};

const handleUpdate = async (e) => {
e.preventDefault();
if (!isEditing) return;

const p = ((formData.actual / formData.target) * 100).toFixed(2);
const newPercentage = Math.min(parseFloat(p), 100).toFixed(2);

if (isDemo) {
  setKpis(prev => prev.map(k => k.id === isEditing ? { ...k, actual: formData.actual, percentage: newPercentage } : k));
  setSaveStatus('Rekod Disimpan (Demo)!');
  setIsEditing(null);
  setTimeout(() => setSaveStatus(null), 2000);
  return;
}

const { error } = await supabaseClient.from('kpis').update({
  actual: formData.actual,
  percentage: newPercentage,
  updated_at: new Date().toISOString()
}).eq('id', isEditing);

if (!error) {
  setSaveStatus('Rekod Berjaya Disimpan!');
  setIsEditing(null);
  setTimeout(() => setSaveStatus(null), 2000);
}
};

const handleSaveRemarks = async () => {
const newRemarks = { text: remarksInput, updatedAt: new Date().toISOString() };
if (isDemo) {
setRemarks(newRemarks);
setIsEditingRemarks(false);
setSaveStatus('Amanat Dikemaskini (Demo)!');
setTimeout(() => setSaveStatus(null), 2000);
return;
}
await supabaseClient.from('config').update({ content: newRemarks }).eq('id', 'remarks');
setIsEditingRemarks(false);
};

const filteredKpis = useMemo(() => {
return kpis.filter(k =>
k.section === activeSection &&
(k.sku_name?.toLowerCase().includes(searchQuery.toLowerCase())
|| k.sub_sku_name?.toLowerCase().includes(searchQuery.toLowerCase()))
);
}, [kpis, activeSection, searchQuery]);

const stats = useMemo(() => SECTIONS.map(s => {
const items = kpis.filter(k => k.section === s);
const avg = items.length ? items.reduce((a, c) => a + parseFloat(c.percentage || 0), 0) / items.length : 0;
return { name: s, count: items.length, avg: avg.toFixed(2) };
}), [kpis]);

const globalAvg = useMemo(() => {
const total = kpis.reduce((a, c) => a + parseFloat(c.percentage || 0), 0);
return (total / (kpis.length || 1)).toFixed(2);
}, [kpis]);

if (loading) return (



Menyusun Sistem SKU 2026.



);
return (


{isDemo && (

Pangkalan Data Belum Disambungkan • Menjalankan Mod Simulasi

)}
  {/* Navigasi Utama */}
  <nav className={`bg-white border-b border-slate-200 p-4 flex flex-wrap justify-between items-center shadow-sm px-8 sticky ${isDemo ? 'top-[40px]' : 'top-0'} z-50`}>
    <div className="flex items-center gap-4">
      <div className="bg-indigo-700 p-3 rounded-2xl text-white shadow-xl rotate-3">
        <TrendingUp size={24} />
      </div>
      <div>
        <h1 className="font-black tracking-tighter text-2xl text-slate-900">SKU PINTAR <span className="text-indigo-600">2026</span></h1>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Dashboard Prestasi Bahagian Pentadbiran</p>
      </div>
    </div>
    <div className="flex gap-2 bg-slate-100 p-1.5 rounded-[1.5rem] border border-slate-200">
      <button onClick={() => setView('dashboard')} className={`px-10 py-3 rounded-2xl text-[11px] font-black tracking-widest transition-all ${view === 'dashboard' ? 'bg-white text-indigo-700 shadow-md scale-105' : 'text-slate-500 hover:text-indigo-600'}`}>DASHBOARD</button>
      <button onClick={() => setView('section')} className={`px-10 py-3 rounded-2xl text-[11px] font-black tracking-widest transition-all ${view === 'section' ? 'bg-white text-indigo-700 shadow-md scale-105' : 'text-slate-500 hover:text-indigo-600'}`}>KEMASKINI PRESTASI</button>
    </div>
  </nav>

  <main className="p-8 max-w-7xl mx-auto">
    {view === 'dashboard' ? (
      <div className="space-y-12 animate-in fade-in duration-700">

        {/* AMANAT SETIAUSAHA BAHAGIAN (SUB) */}
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-200 p-10 rounded-[4rem] shadow-2xl shadow-amber-100/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity"><MessageSquareQuote size={200} /></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-5">
                <div className="bg-amber-500 p-4 rounded-3xl text-white shadow-lg animate-bounce"><Megaphone size={28} /></div>
                <div>
                  <h2 className="font-black text-amber-950 text-2xl tracking-tight uppercase">Teguran Setiausaha Bahagian (SUB)</h2>
                  <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.3em] mt-1">Amanat Semasa Pengurusan Tertinggi</p>
                </div>
              </div>
              <button onClick={() => { setIsEditingRemarks(true); setRemarksInput(remarks.text); }} className="p-4 bg-white/70 hover:bg-white text-amber-900 rounded-[1.5rem] border border-amber-200 shadow-sm transition-all hover:scale-110"><Edit3 size={20} /></button>
            </div>

            {isEditingRemarks ? (
              <div className="space-y-4 animate-in slide-in-from-top-4">
                <textarea
                  className="w-full p-8 bg-white border-2 border-amber-300 rounded-[2.5rem] font-bold text-slate-800 focus:ring-8 focus:ring-amber-100 focus:outline-none min-h-[150px] shadow-inner"
                  value={remarksInput}
                  onChange={(e) => setRemarksInput(e.target.value)}
                />
                <div className="flex justify-end gap-4">
                  <button onClick={() => setIsEditingRemarks(false)} className="px-8 py-4 text-xs font-black text-amber-900 uppercase tracking-widest">Batal</button>
                  <button onClick={handleSaveRemarks} className="px-12 py-4 bg-amber-600 text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest shadow-xl shadow-amber-200 hover:bg-amber-700 transition-all">Simpan Amanat</button>
                </div>
              </div>
            ) : (
              <div className="bg-white/90 p-10 rounded-[3rem] border border-amber-100 shadow-inner backdrop-blur-md">
                <p className="text-xl font-bold text-amber-950 leading-relaxed italic text-center">"{remarks.text}"</p>
                <div className="mt-8 flex items-center justify-center gap-3 text-[10px] font-black text-amber-600 uppercase tracking-[0.2em]">
                  <Calendar size={14} />
                  Dikemas kini: {remarks.updatedAt ? new Date(remarks.updatedAt).toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' }) : "Sistem Baru"}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RINGKASAN PRESTASI GABUNGAN */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-gradient-to-br from-indigo-700 via-indigo-800 to-blue-900 p-14 rounded-[5rem] shadow-2xl shadow-indigo-100 text-white relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-indigo-100 text-xs font-black uppercase tracking-[0.3em] mb-6">Ringkasan Prestasi</p>
              <div className="flex items-center justify-between gap-8">
                <div className="bg-white/10 px-10 py-6 rounded-[2.5rem] border border-white/5 backdrop-blur-2xl">
                  <p className="text-[10px] font-black uppercase opacity-60 tracking-widest mb-2">Item SKU Berdaftar</p>
                  <p className="text-5xl font-black">{kpis.length}</p>
                </div>
                <div className="bg-white/10 px-10 py-6 rounded-[2.5rem] border border-white/5 backdrop-blur-2xl">
                  <p className="text-[10px] font-black uppercase opacity-60 tracking-widest mb-2">Sasaran 100%</p>
                  <p className="text-5xl font-black text-emerald-400">{kpis.filter(k => parseFloat(k.percentage) >= 100).length}</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-[40rem] h-[40rem] bg-indigo-500/20 rounded-full blur-[120px]"></div>
          </div>

          <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100 flex flex-col justify-center">
            <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 border-b pb-5">Prestasi Mengikut Seksyen</h4>
            <div className="space-y-8">
              {stats.map((s, i) => (
                <div key={i} className="group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-black text-slate-600 uppercase tracking-tighter truncate w-36">{s.name.split('(')[1]?.replace(')','') || s.name}</span>
                    <span className="text-base font-black text-indigo-950">{s.avg}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div className={`h-full rounded-full transition-all duration-1000 ${parseFloat(s.avg) >= 100 ? 'bg-emerald-500' : 'bg-indigo-600'}`} style={{width:`${s.avg}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    ) : (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 animate-in slide-in-from-bottom-12 duration-700">
        {/* Sidebar Pilihan Seksyen */}
        <div className="lg:col-span-1 space-y-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] px-8 mb-8 font-bold">Menu Seksyen</p>
          {SECTIONS.map(s => (
            <button
              key={s}
              onClick={() => {setActiveSection(s); setIsEditing(null); setSearchQuery('');}}
              className={`w-full text-left px-10 py-7 rounded-[2.5rem] text-xs font-black flex items-center justify-between transition-all group ${activeSection === s ? 'bg-indigo-700 text-white shadow-2xl shadow-indigo-200 scale-[1.05] translate-x-4' : 'text-slate-600 bg-white border border-slate-100 hover:shadow-xl hover:translate-x-2'}`}
            >
              <span className="truncate pr-2 font-black tracking-tight">{s.split('(')[1]?.replace(')','') || s}</span>
              <ChevronRight size={20} className={activeSection === s ? 'opacity-100' : 'opacity-20'} />
            </button>
          ))}
        </div>

        {/* Panel Editor Pengemaskinian */}
        <div className="lg:col-span-3 space-y-10">
          {isEditing ? (
            <div className="bg-white p-14 rounded-[4.5rem] shadow-2xl border-[8px] border-indigo-700 relative overflow-hidden animate-in zoom-in-95 duration-500">
              <div className="flex items-center justify-between mb-12">
                <h3 className="font-black text-4xl text-slate-950 flex items-center gap-6 tracking-tight uppercase">
                  <Edit3 className="text-white bg-indigo-700 p-4 rounded-3xl shadow-xl shadow-indigo-100" size={56} />
                  Kemaskini Pencapaian
                </h3>
                <button onClick={() => setIsEditing(null)} className="bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 p-5 rounded-3xl transition-all"><XCircle size={28}/></button>
              </div>

              <div className="bg-slate-50 p-10 rounded-[3rem] mb-12 border-2 border-slate-100 shadow-inner">
                <p className="font-black text-slate-900 text-2xl leading-tight mb-4 uppercase tracking-tight">{formData.sku_name}</p>
                <div className="flex items-start gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 border-l-[8px] border-l-indigo-600">
                  <p className="text-slate-600 text-base font-bold italic leading-relaxed">{formData.sub_sku_name}</p>
                </div>
              </div>

              <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-slate-50 p-12 rounded-[3.5rem] border-2 border-slate-100 flex flex-col items-center justify-center group hover:bg-white hover:border-indigo-100 transition-all shadow-inner">
                  <label className="text-[11px] font-black text-slate-400 uppercase mb-8 tracking-widest">Sasaran Tahunan (X)</label>
                  <div className="text-8xl font-black text-slate-950 tracking-tighter">
                    {formData.target}<span className="text-xl font-bold text-slate-400 ml-4 uppercase">{formData.unit}</span>
                  </div>
                </div>

                <div className="bg-indigo-50 p-12 rounded-[3.5rem] border-[4px] border-indigo-200 flex flex-col items-center justify-center shadow-inner group hover:bg-white transition-all">
                  <label className="text-[11px] font-black text-indigo-500 uppercase mb-8 tracking-widest font-bold text-center">Pencapaian Semasa (Y)</label>
                  <input
                    type="number"
                    required
                    autoFocus
                    step="0.01"
                    className="w-full bg-transparent border-none text-center text-9xl font-black text-indigo-700 focus:ring-0 tracking-tighter placeholder:text-indigo-200"
                    value={formData.actual}
                    onChange={(e) => setFormData({...formData, actual: parseFloat(e.target.value) || 0})}
                  />
                </div>

                <button type="submit" className="md:col-span-2 bg-indigo-700 text-white py-10 rounded-[3rem] font-black text-xl uppercase tracking-[0.3em] shadow-2xl shadow-indigo-200 hover:bg-indigo-800 transition-all active:scale-[0.98] flex items-center justify-center gap-6 group">
                  <Save size={32} className="group-hover:rotate-12 transition-transform" />
                  Simpan Prestasi Terkini
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white p-20 rounded-[5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center py-32 relative overflow-hidden group">
              <div className="p-16 bg-indigo-50 rounded-[4rem] mb-12 group-hover:scale-110 t