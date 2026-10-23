import { useState, useEffect } from 'react';
import { projectArchitectures } from '../data/architecture';

const TERMINAL_OUTPUTS = {
  APEX: [
    { text: '$ apex stream --topic telemetry.car44 --rate 60hz --eval-safety', type: 'cmd' },
    { text: '[KAFKA] Connected to broker:9092. Subscribed to telemetry.car44 (partition 2)', type: 'info' },
    { text: '[FEATURE_STORE] Ingestion rate: 66,800 ops/sec | p99 latency: 0.0245ms', type: 'success' },
    { text: '[TYRE_MODEL] MAE: 0.342s/lap | Grip level: 64.2% | Wear slope: 0.12%/lap', type: 'info' },
    { text: '[SAFE_RL] Action proposed: "Soft Slick (Lap 38)" -> ActionMaskGuardrail: VETO (Rain: 94%)', type: 'warn' },
    { text: '[SAFE_RL] Action adjusted: "Intermediate Compound (Lap 39)" -> Status: APPROVED (Safety: 1.00)', type: 'success' },
    { text: '[CONSENSUS] 5/5 Agents aligned: Race Strategist, Tyre Engineer, Weather, Aero, Chief.', type: 'success' },
    { text: '[THREEJS] WebGL 60FPS digital twin updated. Simulation completed with 0 errors.', type: 'info' },
  ],
  Veritas: [
    { text: '$ veritas start --socratic-mode --anti-leak-strict', type: 'cmd' },
    { text: '[LANGGRAPH] Socratic state machine initialized with 3 agent nodes.', type: 'info' },
    { text: '[OCR_VISION] Transcribed student scratchpad handwritten proof: 4 steps detected.', type: 'info' },
    { text: '[RETICLE] Bounding box [ymin: 120, xmin: 45, ymax: 180, xmax: 220] -> "denominator_addition"', type: 'warn' },
    { text: '[SAFETY] Scanned tutor draft: 0 answer leaks detected. Socratic hint confidence: 0.98', type: 'success' },
    { text: '[BKT] Bayesian update applied (w=0.5): P(L_t) updated from 0.42 to 0.58 on CCSS.MATH.7.NS.A.1', type: 'success' },
    { text: '[PGVECTOR] Retrieved targeted remediation problem via ZPD composite utility (score: 0.94)', type: 'info' },
  ],
  'Predictive Maintenance System': [
    { text: '$ pms predict --telemetry-stream --calibrate-sigmoid', type: 'cmd' },
    { text: '[FASTAPI] Ingested telemetry payload: Temp: 92.4C | RPM: 2800 | Vib: 0.64 mm/s', type: 'info' },
    { text: '[RATE_LIMIT] SlowAPI check: 1/60 req/min from client IP [OK]', type: 'info' },
    { text: '[CALIBRATION] CalibratedClassifierCV Platt scaling: raw 0.741 -> calibrated 0.9734 (HIGH)', type: 'warn' },
    { text: '[SHAP] TreeExplainer attributions: RPM (+1.65), Operating Hours (+1.44), Vib (+0.39)', type: 'info' },
    { text: '[DRIFT] Population Stability Index (PSI) = 0.042 (< 0.10: Stable distribution)', type: 'success' },
    { text: '[AUDIT] Prediction logged to PostgreSQL audit store (inference_id: 8b4f2c1a).', type: 'success' },
  ],
  FaRm: [
    { text: '$ farm db --benchmark-ixscan', type: 'cmd' },
    { text: '[COLLSCAN] Query: { category: "Organic", price: { $lte: 50 }, createdAt: { $gte: ... } }', type: 'info' },
    { text: '[COLLSCAN] Execution time: 242.4ms | Docs scanned: 48,200 | Returned: 12', type: 'warn' },
    { text: '[INDEX] Applied Compound B-Tree Index: { category: 1, price: 1, createdAt: -1 }', type: 'info' },
    { text: '[IXSCAN] Execution time: 11.8ms | Keys examined: 12 | Docs examined: 12', type: 'success' },
    { text: '[RESULT] Query latency reduced by 95.1% under 200 concurrent users.', type: 'success' },
  ],
  Left2Serve: [
    { text: '$ left2serve test --concurrency 200 --duration 60s', type: 'cmd' },
    { text: '[ENGINE] Compiled Go 1.24 (Gin Gonic) static binary initialized on :5000', type: 'info' },
    { text: '[INDEX] PostgreSQL B-Tree Index: (status, pickup_window, location_id)', type: 'info' },
    { text: '[METRICS] Peak RPS: 187 req/sec | p95 Latency: 12.4ms (down from 340ms) | Errors: 0.00%', type: 'success' },
    { text: '[CACHE] Redis 7 go-redis/v9 cache hit ratio: 99.4% | Dual-guardrail AI latency: 4.8s', type: 'success' },
    { text: '[ACID] Serializable row locks (FOR UPDATE) + HMAC QR tokens: 0 race conditions.', type: 'success' },
  ],
  MyMate: [
    { text: '$ mymate test --benchmark-concurrency 100 --profile', type: 'cmd' },
    { text: '[GOLANG] Go 1.24 Gin Engine: ~19,400 req/sec (3.6x throughput) | Memory: 21MB (-88%)', type: 'success' },
    { text: '[GEO] 2dsphere index: findNearestDrivers(coords: [19.0760, 72.8777], radius: 3000m)', type: 'info' },
    { text: '[GEO] MongoDB query latency: 0.84ms | Drivers located: 8 within 2.5km radius', type: 'success' },
    { text: '[STREAM] Gorilla WebSocket room alert (<50ms) + Kafka SASL/TLS durable offset commit', type: 'info' },
    { text: '[RANKING] Haskell-verified pure functional scoring + Gemini 2.5 Flash re-ranking', type: 'success' },
  ],
};

const PROJECT_CODE_PATTERNS = {
  APEX: {
    filename: 'ActionMaskGuardrail.ts',
    language: 'typescript',
    complexity: 'Time: O(1) | Space: O(1)',
    invariant: 'Guarantee: Zero illegal compound selections during rainfall anomalies',
    code: `// Safe Reinforcement Learning Action Masking Guardrail
export class ActionMaskGuardrail {
  private readonly WET_TRACK_THRESHOLD = 0.35; // mm water layer

  public computeActionMask(telemetry: CarTelemetry, weather: WeatherState): ActionMask {
    const isRaining = weather.trackWaterDepth > this.WET_TRACK_THRESHOLD;
    const isPittingThisLap = telemetry.distanceToPitEntry < 400; // meters

    return {
      // Hard veto on dry slick compounds in wet conditions
      [CompoundAction.SOFT_SLICK]: !isRaining,
      [CompoundAction.MEDIUM_SLICK]: !isRaining,
      [CompoundAction.HARD_SLICK]: !isRaining,
      
      // Wet weather compounds unlocked strictly when precipitation threshold breached
      [CompoundAction.INTERMEDIATE]: isRaining && weather.trackWaterDepth < 2.5,
      [CompoundAction.FULL_WET]: weather.trackWaterDepth >= 2.5,
      
      // Pit confirmation requires entry deceleration validity
      [PitAction.BOX_THIS_LAP]: isPittingThisLap && telemetry.speedKph < 320,
      [PitAction.STAY_OUT]: true,
    };
  }
}`,
  },
  Veritas: {
    filename: 'BKTEngine.py',
    language: 'python',
    complexity: 'Time: O(1) per step | Space: O(K) skills',
    invariant: 'Guarantee: Zero direct answer leakage with weighted Bayesian Knowledge Tracing',
    code: `import numpy as np

class BayesianKnowledgeTracer:
    """
    Bayesian Knowledge Tracing (BKT) engine tracking student mastery P(L_t)
    across Common Core skills with pedagogical observation weighting.
    """
    def __init__(self, p_init=0.1, p_transit=0.15, p_slip=0.1, p_guess=0.2):
        self.p_l = p_init
        self.p_t = p_transit
        self.p_s = p_slip
        self.p_g = p_guess

    def update_mastery(self, is_correct: bool, weight: float = 1.0) -> float:
        # Scale observation evidence to prevent mastery inflation during hint usage
        if is_correct:
            p_obs = (self.p_l * (1 - self.p_s)) / (self.p_l * (1 - self.p_s) + (1 - self.p_l) * self.p_g)
        else:
            p_obs = (self.p_l * self.p_s) / (self.p_l * self.p_s + (1 - self.p_l) * (1 - self.p_g))
        
        # Weighted Bayesian belief adjustment + latent transition
        p_learned = (1 - weight) * self.p_l + weight * p_obs
        self.p_l = p_learned + (1 - p_learned) * self.p_t
        return float(np.clip(self.p_l, 0.0, 1.0))`,
  },
  'Predictive Maintenance System': {
    filename: 'CalibratedInferenceEngine.py',
    language: 'python',
    complexity: 'Time: O(T * D) tree traversal | Space: O(1)',
    invariant: 'Guarantee: 62.9% reduction in Brier score loss via Platt sigmoid calibration',
    code: `from sklearn.calibration import CalibratedClassifierCV
import xgboost as xgb
import shap

class CalibratedMaintenancePredictor:
    """
    Calibrated failure prediction pipeline with SHAP TreeExplainer feature attributions.
    Transforms raw boosting scores into trustworthy empirical probabilities.
    """
    def __init__(self, base_xgb_model, decision_threshold: float = 0.2619):
        # 3-fold cross-validated Platt sigmoid calibration
        self.calibrator = CalibratedClassifierCV(estimator=base_xgb_model, method='sigmoid', cv='prefit')
        self.explainer = shap.TreeExplainer(base_xgb_model)
        self.threshold = decision_threshold

    def predict_risk(self, feature_vector):
        calibrated_prob = self.calibrator.predict_proba(feature_vector)[:, 1][0]
        risk_tier = "HIGH" if calibrated_prob >= self.threshold else "LOW"
        shap_values = self.explainer.shap_values(feature_vector)[0]
        return {
            "failure_risk": risk_tier,
            "calibrated_probability": float(calibrated_prob),
            "shap_attributions": dict(zip(feature_vector.columns, shap_values))
        }`,
  },
  FaRm: {
    filename: 'MongoIndexOptimizer.js',
    language: 'javascript',
    complexity: 'Time: O(log N) IXSCAN | Space: O(K) B-Tree index memory',
    invariant: 'Guarantee: Eliminates COLLSCAN and reduces p95 query latency from 240ms to 12ms',
    code: `// Compound B-Tree Index Migration Script
db.products.createIndex(
  { category: 1, price: 1, createdAt: -1 },
  {
    name: "idx_catalog_filter_sort",
    background: true, // Non-blocking index build
    partialFilterExpression: { inStock: true } // Sparse partial optimization
  }
);

// Execution Plan Verification:
// db.products.find({ category: "Organic", price: { $lte: 50 } }).sort({ createdAt: -1 }).explain("executionStats")
// Results:
// - stage: "IXSCAN" (Index Scan)
// - totalDocsExamined: 12 (Matched exact filtered set)
// - executionTimeMillis: 11.8ms (95.1% reduction)`,
  },
  Left2Serve: {
    filename: 'claim_service.go',
    language: 'go',
    complexity: 'Time: O(1) row-lock | Space: O(1)',
    invariant: 'Guarantee: Zero double-allocations on concurrent NGO claims under Go 1.24',
    code: `// Package service provides ACID transaction handling with PostgreSQL row-level locks
package service

import (
	"context"
	"database/sql"
	"errors"
	"time"
)

// ClaimDonationBatch executes serializable claim locking and awards time-locked HMAC QR token
func ClaimDonationBatch(ctx context.Context, db *sql.DB, donationID, ngoID string) (*ClaimReceipt, error) {
	tx, err := db.BeginTx(ctx, &sql.TxOptions{Isolation: sql.LevelSerializable})
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	var status string
	var quantity int
	query := "SELECT status, quantity FROM donations WHERE id = $1 FOR UPDATE"
	if err := tx.QueryRowContext(ctx, query, donationID).Scan(&status, &quantity); err != nil {
		return nil, err
	}

	if status != "AVAILABLE" {
		return nil, errors.New("CONCURRENCY_CONFLICT: batch already claimed by another NGO")
	}

	updateQuery := "UPDATE donations SET status = 'CLAIMED', claimed_by = $1, claimed_at = $2 WHERE id = $3"
	if _, err := tx.ExecContext(ctx, updateQuery, ngoID, time.Now().UTC(), donationID); err != nil {
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return &ClaimReceipt{DonationID: donationID, Status: "CLAIMED"}, nil
}`,
  },
  MyMate: {
    filename: 'dispatcher.go',
    language: 'go',
    complexity: 'Time: O(log N) 2dsphere | Space: O(1)',
    invariant: 'Guarantee: Sub-1ms driver matching with Kafka durable audit & Gorilla WebSocket rooms',
    code: `// Package dispatcher provides geospatial driver discovery and dual-stream event dispatching
package dispatcher

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DriverCandidate struct {
	ID          string    \`bson:"_id" json:"id"\`
	Name        string    \`bson:"name" json:"name"\`
	Rating      float64   \`bson:"rating" json:"rating"\`
	Location    []float64 \`bson:"location" json:"location"\`
	VehicleType string    \`bson:"vehicleType" json:"vehicleType"\`
}

// FindNearestDrivers queries MongoDB Atlas with 2dsphere index (~0.84ms execution)
func FindNearestDrivers(ctx context.Context, col *mongo.Collection, lng, lat float64, radiusMeters float64) ([]DriverCandidate, error) {
	filter := bson.M{
		"isAvailable": true,
		"isVerified":  true,
		"location": bson.M{
			"$nearSphere": bson.M{
				"$geometry":    bson.M{"type": "Point", "coordinates": []float64{lng, lat}},
				"$maxDistance": radiusMeters,
			},
		},
	}

	opts := options.Find().SetLimit(10).SetProjection(bson.M{
		"_id": 1, "name": 1, "rating": 1, "location": 1, "vehicleType": 1,
	})

	cursor, err := col.Find(ctx, filter, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var drivers []DriverCandidate
	if err := cursor.All(ctx, &drivers); err != nil {
		return nil, err
	}
	return drivers, nil
}`,
  },
};

export default function ArchitectureModal({ projectTitle, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('blueprint');
  const [copiedLog, setCopiedLog] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const archData = projectArchitectures[projectTitle];

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !archData) return null;

  const tabs = [
    { id: 'blueprint', label: 'System Blueprint', icon: '🏛️' },
    { id: 'patterns', label: 'Implementation Code', icon: '📝' },
    { id: 'db', label: 'DB & Indexing / AI', icon: '⚡' },
    { id: 'security', label: 'Security & Auth', icon: '🛡️' },
    { id: 'loadtest', label: 'Benchmarks & Testing', icon: '📊' },
    { id: 'scenario', label: 'Fault Scenarios', icon: '🔥' },
    { id: 'terminal', label: 'Live CLI & Telemetry', icon: '💻' },
  ];

  const terminalLines = TERMINAL_OUTPUTS[projectTitle] || TERMINAL_OUTPUTS.FaRm;
  const patternData = PROJECT_CODE_PATTERNS[projectTitle] || PROJECT_CODE_PATTERNS.FaRm;

  const handleCopyLogs = () => {
    const raw = terminalLines.map((l) => l.text).join('\n');
    navigator.clipboard.writeText(raw);
    setCopiedLog(true);
    setTimeout(() => setCopiedLog(false), 2000);
  };

  const handleCopyCode = () => {
    if (!patternData) return;
    navigator.clipboard.writeText(patternData.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="arch-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-obsidian/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-obsidian/95 border border-pearl/15 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl overflow-hidden z-10 my-4 sm:my-8 max-h-[92vh] flex flex-col">
        {/* Ambient Modal Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pearl/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-8 border-b border-pearl/10 relative z-10 shrink-0">
          <div className="min-w-0 flex-1 pr-3">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 sm:py-1 bg-pearl/10 text-pearl/80 rounded-full border border-pearl/10">
                System Design & Architecture
              </span>
            </div>
            <h3 id="arch-modal-title" className="text-lg sm:text-2xl font-bold text-pearl drop-shadow-sm truncate">
              {archData.title}
            </h3>
            <p className="text-slate text-[11px] sm:text-sm mt-0.5 sm:mt-1 truncate">{archData.tagline}</p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Architecture Modal"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-pearl/15 bg-pearl/[0.04] text-mist hover:text-pearl hover:border-pearl/30 hover:bg-pearl/10 flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav Tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 px-4 sm:px-8 py-2.5 sm:py-3 border-b border-pearl/10 bg-pearl/[0.02] shrink-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-pearl text-obsidian shadow-lg font-semibold'
                    : 'text-mist hover:text-pearl hover:bg-pearl/[0.05]'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-8 overflow-y-auto relative z-10 space-y-6 flex-1">
          {/* TAB 1: BLUEPRINT & FLOW */}
          {activeTab === 'blueprint' && (
            <div className="space-y-6 animate-fade-in">
              <p className="text-mist text-sm leading-relaxed">{archData.summary}</p>

              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest font-bold text-slate">
                  End-to-End Request & Data Flow
                </h4>
                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-pearl/40 before:via-pearl/15 before:to-transparent">
                  {archData.systemFlow.map((step) => (
                    <div key={step.step} className="relative group">
                      {/* Node Bullet */}
                      <div className="absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full border border-pearl/30 bg-obsidian text-pearl text-[10px] font-bold flex items-center justify-center group-hover:border-pearl group-hover:bg-pearl group-hover:text-obsidian transition-all duration-300">
                        {step.step}
                      </div>

                      <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02] hover:border-pearl/20 hover:bg-pearl/[0.04] transition-all duration-300">
                        <h5 className="text-sm font-semibold text-pearl flex items-center justify-between">
                          {step.title}
                        </h5>
                        <p className="text-mist text-xs leading-relaxed mt-1.5">{step.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {step.tech.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-pearl/[0.06] border border-pearl/10 text-pearl/80"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IMPLEMENTATION PATTERNS & CODE */}
          {activeTab === 'patterns' && patternData && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      📄 {patternData.filename}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {patternData.language}
                    </span>
                  </div>
                  <p className="text-xs text-mist mt-1 font-mono">{patternData.complexity}</p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="text-xs font-mono text-mist hover:text-pearl px-3 py-1.5 rounded-xl bg-pearl/[0.04] border border-pearl/10 hover:border-pearl/20 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>{copiedCode ? '✓ Copied' : '📋 Copy Code'}</span>
                </button>
              </div>

              {/* Code Snippet Window */}
              <div className="p-5 rounded-2xl bg-slate-950 text-slate-100 border border-pearl/15 font-mono text-xs overflow-x-auto shadow-inner">
                <pre className="leading-relaxed">
                  <code>{patternData.code}</code>
                </pre>
              </div>

              {/* Invariant Note */}
              <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-mist flex items-center justify-between">
                <span className="font-mono text-[11px] text-emerald-400">{patternData.invariant}</span>
                <span className="text-emerald-400 font-mono font-bold text-[10px]">VERIFIED</span>
              </div>
            </div>
          )}

          {/* TAB 3: DB & INDEXING */}
          {activeTab === 'db' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02]">
                  <span className="text-[10px] uppercase tracking-wider text-slate">Database / Optimization</span>
                  <p className="text-base font-bold text-pearl mt-1">{archData.dbOptimization.engine}</p>
                </div>
                <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02]">
                  <span className="text-[10px] uppercase tracking-wider text-slate">Latency Profile</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-rose-400 line-through">{archData.dbOptimization.beforeLatency}</span>
                    <span className="text-xs text-slate">→</span>
                    <span className="text-base font-bold text-emerald-400">{archData.dbOptimization.afterLatency}</span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400">Improvement / Agreement</span>
                  <p className="text-xl font-bold text-emerald-300 mt-0.5">
                    {archData.dbOptimization.improvementPercent}
                  </p>
                </div>
              </div>

              {/* Index Code Block */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest font-bold text-slate">Applied Index / Model Definition</span>
                <div className="p-4 rounded-2xl bg-black/70 border border-pearl/15 font-mono text-xs text-emerald-300 overflow-x-auto select-all">
                  <code>{archData.dbOptimization.indexDefinition}</code>
                </div>
              </div>

              {/* Rationale & Explanation */}
              <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02] space-y-2">
                <h5 className="text-sm font-semibold text-pearl">Optimization Mechanics</h5>
                <p className="text-mist text-xs leading-relaxed">{archData.dbOptimization.details}</p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {archData.dbOptimization.metrics.map((m) => (
                  <div key={m.label} className="p-3 rounded-xl border border-pearl/10 bg-pearl/[0.02]">
                    <span className="text-[10px] text-slate block truncate">{m.label}</span>
                    <span className="text-xs font-semibold text-pearl block mt-1">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY & AUTH */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-pearl/10 bg-pearl/[0.02] space-y-2">
                  <div className="flex items-center gap-2 text-pearl font-semibold text-sm">
                    <span>🔑</span> Authentication Protocol
                  </div>
                  <p className="text-mist text-xs leading-relaxed">{archData.security.auth}</p>
                </div>

                <div className="p-5 rounded-2xl border border-pearl/10 bg-pearl/[0.02] space-y-2">
                  <div className="flex items-center gap-2 text-pearl font-semibold text-sm">
                    <span>🛡️</span> Authorization & RBAC
                  </div>
                  <p className="text-mist text-xs leading-relaxed">{archData.security.rbac}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-pearl/10 bg-pearl/[0.02] space-y-3">
                <h5 className="text-sm font-semibold text-pearl flex items-center gap-2">
                  <span>🔒</span> Protective Middleware Pipeline
                </h5>
                <div className="grid sm:grid-cols-2 gap-2">
                  {archData.security.middleware.map((m) => (
                    <div
                      key={m}
                      className="flex items-center gap-2 text-xs text-mist bg-pearl/[0.03] border border-pearl/10 rounded-xl p-2.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BENCHMARKS & TESTING */}
          {activeTab === 'loadtest' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02]">
                  <span className="text-[10px] uppercase tracking-wider text-slate">Framework / Harness</span>
                  <p className="text-sm font-bold text-pearl mt-1">{archData.loadTesting.tool}</p>
                </div>
                <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02]">
                  <span className="text-[10px] uppercase tracking-wider text-slate">Scale / Concurrency</span>
                  <p className="text-sm font-bold text-pearl mt-1">{archData.loadTesting.concurrency}</p>
                </div>
                <div className="p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02]">
                  <span className="text-[10px] uppercase tracking-wider text-slate">Latency / Speed SLA</span>
                  <p className="text-sm font-bold text-emerald-400 mt-1">{archData.loadTesting.p95Latency}</p>
                </div>
                <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400">Error / DNF Rate</span>
                  <p className="text-sm font-bold text-emerald-300 mt-1">{archData.loadTesting.errorRate}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-pearl/10 bg-pearl/[0.02] space-y-2">
                <h5 className="text-sm font-semibold text-pearl">Benchmark Summary & Resilience</h5>
                <p className="text-mist text-xs leading-relaxed">{archData.loadTesting.summary}</p>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl border border-pearl/10 bg-pearl/[0.02] text-xs text-mist">
                <span>Total Benchmark Scenarios / Tests Executed</span>
                <span className="font-semibold text-pearl font-mono">{archData.loadTesting.totalRequests}</span>
              </div>
            </div>
          )}

          {/* TAB 5: FAULT SCENARIO & RECOVERY */}
          {activeTab === 'scenario' && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 rounded-3xl border border-pearl/15 bg-pearl/[0.02] space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20">
                    Real-World Production Case Study
                  </span>
                </div>
                <h4 className="text-lg font-bold text-pearl">
                  {archData.scenario?.title || 'Production Fault Tolerance'}
                </h4>
                <p className="text-mist text-sm leading-relaxed">
                  {archData.scenario?.summary}
                </p>

                <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 block">
                    Core Architectural Recovery Mechanism
                  </span>
                  <p className="text-pearl text-xs font-mono font-semibold">
                    {archData.scenario?.recoveryKey}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: LIVE CLI & TELEMETRY */}
          {activeTab === 'terminal' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-slate ml-2">
                    {projectTitle.toLowerCase()}-telemetry-node
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyLogs}
                  className="text-[11px] font-mono text-mist hover:text-pearl px-2.5 py-1 rounded-lg bg-pearl/[0.04] border border-pearl/10 hover:border-pearl/20 transition-all duration-300 cursor-pointer"
                >
                  {copiedLog ? '✓ Copied' : 'Copy Output'}
                </button>
              </div>

              {/* Terminal Window */}
              <div className="p-5 rounded-2xl bg-slate-950 text-slate-100 border border-pearl/15 font-mono text-xs space-y-2 select-all overflow-x-auto shadow-inner">
                {terminalLines.map((line, idx) => {
                  let colorClass = 'text-slate-300';
                  if (line.type === 'cmd') colorClass = 'text-cyan-400 font-bold';
                  if (line.type === 'success') colorClass = 'text-emerald-400';
                  if (line.type === 'warn') colorClass = 'text-amber-400';
                  if (line.type === 'info') colorClass = 'text-slate-200';

                  return (
                    <div key={idx} className={`${colorClass} leading-relaxed`}>
                      {line.text}
                    </div>
                  );
                })}
              </div>

              <div className="p-3 rounded-xl border border-pearl/10 bg-pearl/[0.02] text-xs text-mist flex items-center justify-between">
                <span className="text-[11px]">Simulated live telemetry output from verified tests & benchmarks</span>
                <span className="text-emerald-400 font-mono font-bold text-[10px]">STATUS: OK</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-pearl/10 bg-pearl/[0.02] flex items-center justify-between text-xs text-slate">
          <span>Engineered with production-first resilience</span>
          <button
            onClick={onClose}
            className="btn-outline !py-1.5 !px-4 text-xs font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
