interface FooterProps {
    developerName: string;
    year?: number;
}

export function Footer({
    developerName,
    year = new Date().getFullYear(),
}: FooterProps) {
    return (
        <footer className="w-full py-6 px-14 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 md:mb-0">
                        © {year} Doblix - Juego de Memoria. All rights reserved.
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                        by
                        &nbsp;
                        <a
                            href="https://www.linkedin.com/in/rumaldo-riquelme20"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                            {developerName}
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
