export default function Footer({ setCurrentPage }: { setCurrentPage: (page: any) => void }) {
  return (
    <footer className="mt-auto py-12 px-10 border-t-4 border-black bg-white dark:bg-black text-[10px] sm:text-[12px] text-black dark:text-white font-black uppercase tracking-[0.2em] flex flex-col sm:flex-row items-center justify-between gap-6">
      <span className="cursor-pointer" onClick={() => setCurrentPage('admin')}>Copyright By Pahaji - Nazri - Noxius Team Est 2026</span>
      <div className="flex gap-8">
        <button onClick={() => setCurrentPage('terms')} className="hover:bg-[#FF4911] hover:text-white dark:hover:text-black p-1 transition-colors uppercase">Terms</button>
        <button onClick={() => setCurrentPage('privacy')} className="hover:bg-[#FF4911] hover:text-white dark:hover:text-black p-1 transition-colors uppercase">Privacy</button>
        <button onClick={() => setCurrentPage('feedback')} className="hover:bg-[#FF4911] hover:text-white dark:hover:text-black p-1 transition-colors uppercase">Feedback</button>
      </div>
    </footer>
  );
}
