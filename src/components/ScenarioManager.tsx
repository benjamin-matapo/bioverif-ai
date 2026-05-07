"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { BiomedQuestion } from "@/lib/biomed-data";
import { addCustomScenario, deleteCustomScenario } from "@/lib/customScenarios";

interface ScenarioManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onScenariosChange: (scenarios: BiomedQuestion[]) => void;
  customScenarios: BiomedQuestion[];
}

export function ScenarioManager({
  isOpen,
  onClose,
  onScenariosChange,
  customScenarios,
}: ScenarioManagerProps) {
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState<"Undergraduate" | "Postgraduate" | "Expert">("Undergraduate");
  const [question, setQuestion] = useState("");
  const [groundTruth, setGroundTruth] = useState("");
  const [keyTerms, setKeyTerms] = useState<string[]>([]);
  const [keyTermInput, setKeyTermInput] = useState("");

  const handleAddKeyTerm = () => {
    const term = keyTermInput.trim();
    if (term && !keyTerms.includes(term)) {
      setKeyTerms([...keyTerms, term]);
      setKeyTermInput("");
    }
  };

  const handleKeyTermKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddKeyTerm();
    }
  };

  const handleRemoveKeyTerm = (term: string) => {
    setKeyTerms(keyTerms.filter((t) => t !== term));
  };

  const handleSaveScenario = () => {
    if (!category.trim() || !question.trim() || !groundTruth.trim()) {
      return;
    }

    const newScenario: BiomedQuestion = {
      id: `${category.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      category: category.trim(),
      difficulty,
      question: question.trim(),
      groundTruth: groundTruth.trim(),
      keyTerms,
    };

    const updated = addCustomScenario(newScenario);
    onScenariosChange(updated);

    setCategory("");
    setDifficulty("Undergraduate");
    setQuestion("");
    setGroundTruth("");
    setKeyTerms([]);
    setKeyTermInput("");
    setIsFormExpanded(false);
  };

  const handleDeleteScenario = (id: string) => {
    const updated = deleteCustomScenario(id);
    onScenariosChange(updated);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#002244]">
              Manage Custom Scenarios
            </h2>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 focus:outline-none"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <button
              onClick={() => setIsFormExpanded(!isFormExpanded)}
              className="w-full flex items-center justify-center gap-2 border border-[#002244] text-[#002244] px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Plus className="h-4 w-4" />
              {isFormExpanded ? "Cancel" : "Add New Scenario +"}
            </button>

            {isFormExpanded && (
              <div className="mt-4 space-y-4 p-4 bg-slate-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002244]"
                    placeholder="e.g., Immunology"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as "Undergraduate" | "Postgraduate" | "Expert")}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002244]"
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Question
                  </label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002244] min-h-24"
                    placeholder="Enter your question..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Ground Truth
                  </label>
                  <textarea
                    value={groundTruth}
                    onChange={(e) => setGroundTruth(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002244] min-h-40"
                    placeholder="Enter the expert answer..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Key Terms
                  </label>
                  <input
                    type="text"
                    value={keyTermInput}
                    onChange={(e) => setKeyTermInput(e.target.value)}
                    onKeyDown={handleKeyTermKeyDown}
                    onBlur={handleAddKeyTerm}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002244]"
                    placeholder="Type term and press Enter or comma..."
                  />
                  {keyTerms.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {keyTerms.map((term) => (
                        <span
                          key={term}
                          className="inline-flex items-center gap-1 bg-[#002244] text-white px-2 py-1 rounded-full text-xs"
                        >
                          {term}
                          <button
                            onClick={() => handleRemoveKeyTerm(term)}
                            className="hover:text-slate-300 focus:outline-none"
                            aria-label={`Remove ${term}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSaveScenario}
                  className="w-full bg-[#002244] text-white px-4 py-2 rounded-lg hover:bg-[#001a33] transition-colors font-medium"
                >
                  Save Scenario
                </button>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Existing Custom Scenarios
            </h3>
            {customScenarios.length === 0 ? (
              <p className="text-slate-500 text-sm">
                No custom scenarios yet. Add one above.
              </p>
            ) : (
              <div className="space-y-3">
                {customScenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    className="p-4 border border-slate-200 rounded-lg bg-white"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-slate-900">
                            {scenario.category}
                          </span>
                          <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded">
                            {scenario.difficulty}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {scenario.question.slice(0, 80)}
                          {scenario.question.length > 80 ? "..." : ""}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteScenario(scenario.id)}
                        className="shrink-0 text-red-600 hover:text-red-800 focus:outline-none"
                        aria-label="Delete scenario"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
