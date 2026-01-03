
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
    { id: 1, label: 'Analysis' },
    { id: 2, label: 'Keywords' },
    { id: 3, label: 'Writing' },
    { id: 4, label: 'Live' }
];

export default function PipelineStepper({ currentPhase }: { currentPhase: number }) {
    return (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 mb-8">
            <h3 className="text-zinc-400 text-sm font-medium uppercase mb-6 tracking-wider">Campaign Pipeline</h3>
            <div className="flex items-center justify-between relative">
                {/* Connecting Line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-zinc-800 -z-10" />

                {/* Dynamic Progress Line */}
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-emerald-500 -z-10 transition-all duration-500"
                    style={{ width: `${((currentPhase - 1) / (STEPS.length - 1)) * 100}%` }}
                />

                {STEPS.map((step) => {
                    const isCompleted = currentPhase > step.id;
                    const isCurrent = currentPhase === step.id;
                    const isPending = currentPhase < step.id;

                    return (
                        <div key={step.id} className="flex flex-col items-center gap-3 bg-zinc-950 px-2 z-10">
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                isCompleted || isCurrent ? "bg-emerald-500 border-emerald-500 text-white" : "bg-zinc-900 border-zinc-800 text-zinc-600"
                            )}>
                                {isCompleted ? <Check className="w-5 h-5" /> : <span className="font-bold text-sm">{step.id}</span>}
                            </div>
                            <span className={cn(
                                "text-xs font-bold uppercase tracking-wider transition-colors duration-300",
                                isCurrent ? "text-white" : isCompleted ? "text-emerald-500" : "text-zinc-600"
                            )}>
                                {step.label}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
