import { useState } from 'react';

type Section = 'overview' | 'architecture' | 'code-issues' | 'test-failures' | 'recommendations' | 'best-practices';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('overview');

  const sections: { id: Section; label: string; icon: string }[] = [
    { id: 'overview', label: 'نظرة عامة', icon: '📋' },
    { id: 'architecture', label: 'تحليل المعمارية', icon: '🏗️' },
    { id: 'code-issues', label: 'عيوب الكود', icon: '🐛' },
    { id: 'test-failures', label: 'لماذا تفشل الاختبارات', icon: '❌' },
    { id: 'recommendations', label: 'التوصيات والإصلاحات', icon: '💡' },
    { id: 'best-practices', label: 'أفضل المعماريات', icon: '⭐' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100" dir="rtl">
      {/* Header */}
      <header className="bg-gradient-to-l from-red-900/50 via-gray-900 to-orange-900/50 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🔍</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                تقرير تحليل كود Source Control Integration
              </h1>
              <p className="text-gray-400 mt-1">
                Peldrun Backend — تحليل شامل للعيوب والأسباب والتوصيات
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800/50 border-b border-gray-700 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <span className="ml-2">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeSection === 'overview' && <OverviewSection />}
        {activeSection === 'architecture' && <ArchitectureSection />}
        {activeSection === 'code-issues' && <CodeIssuesSection />}
        {activeSection === 'test-failures' && <TestFailuresSection />}
        {activeSection === 'recommendations' && <RecommendationsSection />}
        {activeSection === 'best-practices' && <BestPracticesSection />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          تقرير تحليلي — تم إنشاؤه بعد مراجعة شاملة للكود والاختبارات على GitHub
        </div>
      </footer>
    </div>
  );
}

function Card({ title, children, variant = 'default' }: { title: string; children: React.ReactNode; variant?: 'default' | 'danger' | 'warning' | 'success' }) {
  const borderColors = {
    default: 'border-gray-700',
    danger: 'border-red-500',
    warning: 'border-yellow-500',
    success: 'border-green-500',
  };
  return (
    <div className={`bg-gray-800 rounded-xl border ${borderColors[variant]} p-6 mb-6`}>
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Badge({ children, color = 'red' }: { children: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    red: 'bg-red-900/50 text-red-300 border-red-700',
    yellow: 'bg-yellow-900/50 text-yellow-300 border-yellow-700',
    green: 'bg-green-900/50 text-green-300 border-green-700',
    blue: 'bg-blue-900/50 text-blue-300 border-blue-700',
    purple: 'bg-purple-900/50 text-purple-300 border-purple-700',
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${colors[color] || colors.red}`}>
      {children}
    </span>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm text-green-300 font-mono my-3" dir="ltr">
      {children}
    </pre>
  );
}

function OverviewSection() {
  return (
    <div>
      <Card title="📊 ملخص المشروع">
        <div className="space-y-4 text-gray-300">
          <p>
            هذه الميزة هي <strong className="text-orange-400">تكامل Source Control</strong> في مشروع Peldrun، 
            وتهدف إلى توفير واجهة موحدة للتفاعل مع مزودي خدمات التحكم بالمصدر (GitHub, GitLab, Bitbucket).
          </p>
          <p>
            الكود مبني على نمط <strong className="text-blue-400">Hexagonal Architecture (Ports & Adapters)</strong> 
            ويحتوي على:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="text-orange-400 font-bold">domain/</div>
              <div className="text-sm text-gray-400">النماذج والسياسات</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="text-orange-400 font-bold">ports/</div>
              <div className="text-sm text-gray-400">الواجهات المجردة</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="text-orange-400 font-bold">providers/</div>
              <div className="text-sm text-gray-400">التكيفات مع المزودين</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="text-orange-400 font-bold">security/</div>
              <div className="text-sm text-gray-400">الأمان والموافقات</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="text-orange-400 font-bold">operations/</div>
              <div className="text-sm text-gray-400">آلة الحالة والاسترداد</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="text-orange-400 font-bold">git/</div>
              <div className="text-sm text-gray-400">محرك Git المحلي</div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="🎯 الهدف من الميزة" variant="success">
        <ul className="space-y-2 text-gray-300">
          <li>✅ توفير واجهة موحدة للتفاعل مع GitHub/GitLab/Bitbucket</li>
          <li>✅ إدارة مساحات عمل Git معزولة (Workspaces)</li>
          <li>✅ نظام موافقات بشري (Human Approval Gate) قبل أي عملية تعديل</li>
          <li>✅ تشفير وتجزئة الـ Diff لمنع التلاعب</li>
          <li>✅ آلة حالة متينة (Durable State Machine) مع استرداد من الأعطال</li>
          <li>✅ أدوات Agent للتفاعل مع Source Control</li>
          <li>✅ حماية المسارات ومنع Path Traversal</li>
        </ul>
      </Card>

      <Card title="⚠️ الحكم العام" variant="danger">
        <div className="space-y-3 text-gray-300">
          <p className="text-lg font-bold text-red-400">الكود لا يعمل بشكل صحيح والاختبارات تفشل</p>
          <p>الأسباب الرئيسية:</p>
          <ol className="list-decimal list-inside space-y-2 mr-4">
            <li><strong>تعارض في الواجهات (Interface Mismatch):</strong> الاختبارات تستدعي methods غير موجودة في الكود الفعلي</li>
            <li><strong>تكرار النماذج (Model Duplication):</strong> ApprovalTicket معرّف في مكانين مختلفين</li>
            <li><strong>خلط بين Sync و Async:</strong> بعض الـ methods متزامنة وأخرى غير متزامنة بدون توحيد</li>
            <li><strong>أسماء methods مختلفة:</strong> بين ما يتوقعه الاختبار وما يوفره الكود</li>
            <li><strong>استيراد معطل:</strong> WorkspaceRef غير موجود في domain.models</li>
          </ol>
        </div>
      </Card>
    </div>
  );
}

function ArchitectureSection() {
  return (
    <div>
      <Card title="🏗️ المعمارية المتبعة">
        <div className="space-y-4 text-gray-300">
          <p>
            المشروع يحاول تطبيق <strong className="text-blue-400">Hexagonal Architecture</strong> (المعمارية السداسية) 
            المعروفة أيضاً بـ <strong>Ports & Adapters</strong>. هذا النمط يفصل بين:
          </p>
          <div className="bg-gray-700/50 rounded-lg p-4 my-4">
            <div className="text-center text-lg font-bold text-orange-400 mb-3">الهيكل المعماري</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
                <div className="font-bold text-green-400 mb-2">الداخل (Domain)</div>
                <ul className="text-gray-300 space-y-1">
                  <li>• enums.py</li>
                  <li>• models.py</li>
                  <li>• policies.py</li>
                </ul>
              </div>
              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3">
                <div className="font-bold text-blue-400 mb-2">المنافذ (Ports)</div>
                <ul className="text-gray-300 space-y-1">
                  <li>• provider.py (Protocol)</li>
                  <li>• auth.py</li>
                  <li>• repository.py</li>
                  <li>• checks.py</li>
                </ul>
              </div>
              <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-3">
                <div className="font-bold text-purple-400 mb-2">التكيفات (Adapters)</div>
                <ul className="text-gray-300 space-y-1">
                  <li>• GitHubProviderAdapter</li>
                  <li>• GitWorkspaceManager</li>
                  <li>• GitPushManager</li>
                  <li>• GitDiffEngine</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="🔴 المشاكل المعمارية الجوهرية" variant="danger">
        <div className="space-y-4">
          <IssueBlock
            title="1. انتهاك مبدأ Dependency Inversion"
            severity="critical"
            description="الـ __init__.py يستورد كل شيء ويصدره، مما يخلق coupling عالي جداً. أي تغيير في أي ملف فرعي يكسر كل شيء."
            code={`# __init__.py يستورد ~150+ symbol من كل الملفات الفرعية
from .domain.enums import ...
from .domain.models import ...
from .ports.provider import ...
from .providers import ...
from .security.approval import ...
# ... إلخ`}
          />
          <IssueBlock
            title="2. تكرار النماذج (Model Duplication)"
            severity="critical"
            description="ApprovalTicket معرّف في domain/models.py وأيضاً في security/approval.py. هذا يعني أن هناك نسختين مختلفتين من نفس النموذج."
            code={`# domain/models.py
@dataclass(frozen=True)
class ApprovalTicket: ...

# security/approval.py (نسخة ثانية!)
@dataclass(frozen=True) 
class ApprovalTicket: ...`}
          />
          <IssueBlock
            title="3. عدم وجود طبقة Application Service"
            severity="high"
            description="لا يوجد فصل واضح بين Domain Logic و Application Logic. OperationService يخلط بين الاثنين."
          />
          <IssueBlock
            title="4. Singleton Pattern مفرط الاستخدام"
            severity="medium"
            description="كل شيء يعتمد على global singletons (get_default_*). هذا يجعل الاختبار صعباً ويخلق state مشترك بين الاختبارات."
            code={`_DEFAULT_REGISTRY: Optional[ProviderRegistry] = None
_DEFAULT_APPROVAL_GATE: Optional[ApprovalGate] = None
_DEFAULT_OPERATION_JOURNAL: Optional[OperationJournal] = None
_DEFAULT_OPERATION_SERVICE: Optional[OperationService] = None
_DEFAULT_POLICY_ENGINE: Optional[PolicyEngine] = None
# ... كل شيء singleton!`}
          />
        </div>
      </Card>

      <Card title="📐 مقارنة مع المعمارية المثالية" variant="warning">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-300">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-3 px-4 text-right">المعيار</th>
                <th className="py-3 px-4 text-right">المعمارية المثالية</th>
                <th className="py-3 px-4 text-right">الكود الحالي</th>
                <th className="py-3 px-4 text-right">الحالة</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-2 px-4">فصل Domain عن Infrastructure</td>
                <td className="py-2 px-4">نعم - domain لا يعرف أي تفاصيل خارجية</td>
                <td className="py-2 px-4">جزئياً - لكن __init__.py يكسر العزل</td>
                <td className="py-2 px-4"><Badge color="yellow">جزئي</Badge></td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 px-4">Ports كواجهات مستقلة</td>
                <td className="py-2 px-4">Protocol/ABC في ports/ فقط</td>
                <td className="py-2 px-4">نعم - لكن بعض الـ ports لا تتطابق مع الاستخدام</td>
                <td className="py-2 px-4"><Badge color="yellow">جزئي</Badge></td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 px-4">Dependency Injection</td>
                <td className="py-2 px-4">Constructor injection + DI Container</td>
                <td className="py-2 px-4">Global singletons فقط</td>
                <td className="py-2 px-4"><Badge color="red">فشل</Badge></td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 px-4">Single Responsibility</td>
                <td className="py-2 px-4">كل class له مسؤولية واحدة</td>
                <td className="py-2 px-4">OperationJournal يدير persistence + events + idempotency</td>
                <td className="py-2 px-4"><Badge color="red">فشل</Badge></td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 px-4">Testability</td>
                <td className="py-2 px-4">سهولة استبدال الـ dependencies</td>
                <td className="py-2 px-4">صعب بسبب singletons والـ global state</td>
                <td className="py-2 px-4"><Badge color="red">فشل</Badge></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function IssueBlock({ title, severity, description, code }: { title: string; severity: 'critical' | 'high' | 'medium' | 'low'; description: string; code?: string }) {
  const colors = {
    critical: 'text-red-400',
    high: 'text-orange-400',
    medium: 'text-yellow-400',
    low: 'text-blue-400',
  };
  const badges = {
    critical: 'حرج',
    high: 'عالي',
    medium: 'متوسط',
    low: 'منخفض',
  };
  return (
    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center gap-2 mb-2">
        <span className={`font-bold ${colors[severity]}`}>{title}</span>
        <Badge color={severity === 'critical' ? 'red' : severity === 'high' ? 'yellow' : 'blue'}>
          {badges[severity]}
        </Badge>
      </div>
      <p className="text-gray-300 text-sm">{description}</p>
      {code && <CodeBlock>{code}</CodeBlock>}
    </div>
  );
}

function CodeIssuesSection() {
  return (
    <div>
      <Card title="🐛 العيوب الحقيقية في الكود" variant="danger">
        <div className="space-y-6">
          <div>
            <h4 className="text-red-400 font-bold text-lg mb-3">🔴 عيوب حرجة (Critical)</h4>
            
            <div className="space-y-4">
              <IssueBlock
                title="1. WorkspaceRef غير موجود - ImportError"
                severity="critical"
                description="ملف git/workspace.py يستورد WorkspaceRef من domain.models لكن هذا النموذج غير معرّف هناك!"
                code={`# git/workspace.py - السطر:
from ..domain.models import BranchRef, DiffSummary, FileDiff, RepositoryRef, WorkspaceRef
#                                                              ^^^^^^^^^^^^^^
# WorkspaceRef غير موجود في domain/models.py!
# هذا يسبب ImportError فوري عند استيراد أي شيء من git/`}
              />

              <IssueBlock
                title="2. تعارض في أسماء الـ Methods"
                severity="critical"
                description="الاختبارات تستدعي methods بأسماء مختلفة عن الموجودة في الكود الفعلي"
                code={`# الاختبار يتوقع:
workspace_manager.create_workspace(repository_id="repo_101", ...)
workspace_manager.delete_workspace(ws.workspace_id)
workspace_manager.refresh_workspace_status(ws.workspace_id)

# الكود الفعلي يوفر:
workspace_manager.create_workspace(repo: RepositoryRef, ...)  # يقبل RepositoryRef وليس repository_id!
workspace_manager.cleanup_workspace(workspace_id)  # ليس delete_workspace
# لا يوجد refresh_workspace_status أصلاً!`}
              />

              <IssueBlock
                title="3. ProviderRegistry.has() vs has_provider()"
                severity="critical"
                description="providers/__init__.py يستدعي registry.has_provider() لكن الـ Registry يوفر has() فقط"
                code={`# providers/__init__.py:
if not target_registry.has_provider(ProviderId.GITHUB):  # ❌ لا يوجد!
    target_registry.register(GitHubProviderAdapter())

# registry.py يوفر:
def has(self, provider_id: ProviderId | str) -> bool:  # ✅ الاسم الصحيح`}
              />

              <IssueBlock
                title="4. تعارض في SourceControlErrorCode"
                severity="critical"
                description="الاختبارات تتوقع قيم بأحرف كبيرة (UPPER_CASE) لكن الكود يستخدم أحرف صغيرة (lower_case)"
                code={`# الاختبار يتوقع:
assert SourceControlErrorCode.AUTH_REQUIRED.value == "AUTH_REQUIRED"
assert SourceControlErrorCode.NOT_FOUND.value == "NOT_FOUND"

# الكود الفعلي:
class SourceControlErrorCode(str, Enum):
    AUTH_REQUIRED = "auth_required"      # ❌ small case!
    NOT_FOUND = "not_found"              # ❌ small case!`}
              />

              <IssueBlock
                title="5. FileChangeType ينقصه 'copied'"
                severity="critical"
                description="الاختبار يتوقع 5 قيم لكن الكود يوفر 4 فقط"
                code={`# الاختبار يتوقع:
expected = {"added", "modified", "deleted", "renamed", "copied"}  # 5 قيم

# الكود الفعلي:
class FileChangeType(str, Enum):
    ADDED = "added"
    MODIFIED = "modified"
    DELETED = "deleted"
    RENAMED = "renamed"
    # ❌ لا يوجد COPIED!`}
              />
            </div>
          </div>

          <div>
            <h4 className="text-orange-400 font-bold text-lg mb-3">🟠 عيوب عالية (High)</h4>
            <div className="space-y-4">
              <IssueBlock
                title="6. is_protected_branch لا يتطابق مع الاختبارات"
                severity="high"
                description="الاختبار يتوقع 'develop' و 'release' و 'stage' كـ protected لكن الـ policy لا تتضمنها"
                code={`# الاختبار يتوقع:
assert is_protected_branch("develop") is True      # ❌
assert is_protected_branch("release") is True      # ❌
assert is_protected_branch("stage") is True        # ❌
assert is_protected_branch("MAIN") is True         # ❌ (case sensitive!)
assert is_protected_branch(" Master ") is True     # ❌

# السياسة الحالية:
protected_patterns = ("main", "master", "release/*", "prod*", "staging*")
# "develop" غير موجود!
# "release" بدون /* لا يتطابق!
# "MAIN" - fnmatchcase حساس لحالة الأحرف!
# " Master " - strip() موجود لكن "release" لا يتطابق مع "release/*"`}
              />

              <IssueBlock
                title="7. is_workflow_path لا يتطابق مع .circleci"
                severity="high"
                description="الاختبار يتوقع .circleci/config.yml كـ workflow لكن السياسة لا تتضمنه"
                code={`# الاختبار يتوقع:
assert is_workflow_path(".circleci/config.yml") is True  # ❌

# السياسة الحالية:
workflow_patterns = (
    ".github/workflows/*",
    ".gitlab-ci.yml",
    "bitbucket-pipelines.yml",
)
# ❌ لا يوجد .circleci/config.yml!`}
              />

              <IssueBlock
                title="8. خلط Sync/Async في OperationJournal"
                severity="high"
                description="OperationJournal يخلط بين methods متزامنة وغير متزامنة بشكل غير متسق"
                code={`# بعض الـ methods sync:
def save_operation(self, operation: OperationRecord) -> None: ...
def get_operation(self, operation_id: str) -> Optional[OperationRecord]: ...

# وبعضها async:
async def save_record(self, record: OperationRecord) -> None: ...
async def get_record(self, operation_id: str) -> Optional[OperationRecord]: ...

# OperationService يحاول التعامل مع الاثنين:
if hasattr(self.journal, "save_record"):
    await self.journal.save_record(operation)
else:
    self.journal.save_operation(operation)`}
              />
            </div>
          </div>

          <div>
            <h4 className="text-yellow-400 font-bold text-lg mb-3">🟡 عيوب متوسطة (Medium)</h4>
            <div className="space-y-4">
              <IssueBlock
                title="9. استخدام datetime.utcnow() المهجور"
                severity="medium"
                description="datetime.utcnow() مهجور في Python 3.12+ ويجب استخدام datetime.now(timezone.utc)"
              />
              <IssueBlock
                title="10. __post_init__ في frozen dataclasses"
                severity="medium"
                description="استخدام object.__setattr__ في __post_init__ لتجاوز frozen=True هو hack خطير وقد يسبب سلوك غير متوقع"
              />
              <IssueBlock
                title="11. InMemoryOperationJournal = SQLiteOperationJournal"
                severity="medium"
                description="كلا الاسمين يشير إلى نفس الكلاس! لا يوجد تنفيذ SQLite حقيقي. هذا مضلل."
                code={`# في journal.py:
InMemoryOperationJournal = OperationJournal
SQLiteOperationJournal = OperationJournal  # ❌ نفس الكلاس! ليس SQLite حقيقي!`}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function TestFailuresSection() {
  return (
    <div>
      <Card title="❌ لماذا تفشل الاختبارات - تحليل مفصل" variant="danger">
        <div className="space-y-6">
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
            <h4 className="text-red-400 font-bold mb-2">السبب الجذري الرئيسي</h4>
            <p className="text-gray-300">
              الاختبارات كُتبت لواجهة (API) مختلفة عن ما يوفره الكود الفعلي. 
              هناك <strong>فجوة كبيرة</strong> بين ما يتوقعه المطور الذي كتب الاختبارات 
              وما قدمه المطور الذي كتب الكود.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3">📝 test_domain_models.py - أسباب الفشل</h4>
            <div className="space-y-3">
              <TestFailure
                test="test_file_change_type_enum_values"
                reason="FileChangeType لا يحتوي على 'copied' - الاختبار يتوقع 5 قيم والكود يوفر 4"
                fix="إضافة COPIED = 'copied' إلى FileChangeType enum"
              />
              <TestFailure
                test="test_source_control_error_codes"
                reason="الاختبار يتوقع 'AUTH_REQUIRED' (أحرف كبيرة) والكود يوفر 'auth_required' (أحرف صغيرة)"
                fix="تغيير قيم SourceControlErrorCode إلى UPPER_CASE أو تعديل الاختبارات"
              />
              <TestFailure
                test="test_is_protected_branch_true"
                reason="'develop' و 'release' و 'stage' غير محمية في السياسة الحالية. أيضاً 'MAIN' (أحرف كبيرة) لا يتطابق"
                fix="إضافة الأنماط المفقودة وجعل المقارنة case-insensitive"
              />
              <TestFailure
                test="test_is_workflow_path_true"
                reason="'.circleci/config.yml' غير موجود في workflow_patterns"
                fix="إضافة '.circleci/*' إلى workflow_patterns"
              />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3">📝 test_approval_gate.py - أسباب الفشل</h4>
            <div className="space-y-3">
              <TestFailure
                test="test_create_ticket_validates_inputs"
                reason="قد يعمل بشكل صحيح لكن يعتمد على أن ValidationError يُرفع بشكل صحيح"
                fix="التأكد من أن validation يعمل كما هو متوقع"
              />
              <TestFailure
                test="test_expired_ticket_fails_consumption"
                reason="ttl_seconds=-10 قد لا يعمل لأن datetime.utcnow() + timedelta(seconds=-10) يعتمد على التوقيت"
                fix="استخدام mock للوقت أو التأكد من أن الحساب صحيح"
              />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3">📝 test_git_workspace.py - أسباب الفشل</h4>
            <div className="space-y-3">
              <TestFailure
                test="test_workspace_manager_create_and_get"
                reason="يستدعي create_workspace(repository_id='repo_101', ...) لكن الكود يقبل repo: RepositoryRef"
                fix="إعادة كتابة الكود ليقبل repository_id أو تعديل الاختبارات"
              />
              <TestFailure
                test="test_workspace_dirty_state_detection"
                reason="يستدعي refresh_workspace_status() وهي غير موجودة في الكود"
                fix="إضافة method refresh_workspace_status أو استخدام is_dirty()"
              />
              <TestFailure
                test="test_workspace_cleanup_removes_directory"
                reason="يستدعي delete_workspace() لكن الكود يوفر cleanup_workspace()"
                fix="توحيد أسماء الـ methods"
              />
              <TestFailure
                test="IMPORT ERROR"
                reason="git/workspace.py يستورد WorkspaceRef من domain.models وهو غير موجود!"
                fix="إضافة WorkspaceRef إلى domain/models.py"
              />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3">📝 test_operations_journal.py - أسباب الفشل</h4>
            <div className="space-y-3">
              <TestFailure
                test="test_journal_saves_and_retrieves_record"
                reason="يستدعي journal.save_record() و journal.get_record() وهي async methods"
                fix="التأكد من أن pytest-asyncio مثبت ومُعد بشكل صحيح"
              />
              <TestFailure
                test="test_operation_service_lifecycle_transitions"
                reason="OperationService قد لا يكون متوافقاً مع OperationJournal في الـ async interface"
                fix="توحيد الواجهة بين Service و Journal"
              />
              <TestFailure
                test="test_crash_recovery_after_restart"
                reason="يعتمد على أن _recover_from_disk_locked يعمل بشكل صحيح مع JSON files"
                fix="التأكد من أن recovery logic يتعامل مع جميع الحالات"
              />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3">📝 conftest.py - مشاكل في الإعداد</h4>
            <div className="space-y-3">
              <TestFailure
                test="Imports"
                reason="conftest.py يستورد من . (test __init__.py) لكن الثوابت قد لا تكون متاحة"
                fix="التأكد من أن __init__.py يصدر كل الثوابت المطلوبة"
              />
              <TestFailure
                test="MockSourceControlProvider"
                reason="يحتوي على methods إضافية مثل read_file() و get_check_summary() غير موجودة في Protocol"
                fix="تحديث Protocol ليشمل كل الـ methods المطلوبة"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function TestFailure({ test, reason, fix }: { test: string; reason: string; fix: string }) {
  return (
    <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-red-400 font-mono text-sm">{test}</span>
        <Badge color="red">FAIL</Badge>
      </div>
      <p className="text-gray-400 text-sm">
        <span className="text-yellow-400">السبب:</span> {reason}
      </p>
      <p className="text-gray-400 text-sm">
        <span className="text-green-400">الحل:</span> {fix}
      </p>
    </div>
  );
}

function RecommendationsSection() {
  return (
    <div>
      <Card title="💡 التوصيات والإصلاحات المطلوبة" variant="success">
        <div className="space-y-6">
          <div>
            <h4 className="text-green-400 font-bold text-lg mb-3">🔧 إصلاحات فورية (Must Fix)</h4>
            <div className="space-y-3">
              <FixItem
                priority={1}
                title="إضافة WorkspaceRef إلى domain/models.py"
                description="هذا يسبب ImportError فوري. يجب إضافة النموذج المفقود."
                code={`@dataclass(frozen=True)
class WorkspaceRef:
    workspace_id: str
    repository_id: str
    workspace_path: str
    current_branch: str
    base_sha: str
    head_sha: str = ""
    is_worktree: bool = False
    is_clean: bool = True
    created_at: Optional[datetime] = None
    metadata: dict[str, Any] = field(default_factory=dict)`}
              />
              <FixItem
                priority={2}
                title="توحيد أسماء الـ Methods"
                description="يجب أن يكون هناك تطابق تام بين ما يوفره الكود وما يتوقعه الاختبار."
                code={`# في GitWorkspaceManager:
# إضافة aliases:
delete_workspace = cleanup_workspace  # أو العكس

# إضافة method المفقود:
async def refresh_workspace_status(self, workspace_id: str) -> WorkspaceRef:
    ws = self.get_workspace(workspace_id)
    if ws is None:
        raise ValidationError(f"Workspace '{workspace_id}' not found.")
    dirty = await self.is_dirty(workspace_id)
    branch = await self.get_current_branch(workspace_id)
    head = await self.get_head_sha(workspace_id)
    return dataclasses.replace(ws, is_clean=not dirty, current_branch=branch, head_sha=head)`}
              />
              <FixItem
                priority={3}
                title="إصلاح SourceControlErrorCode"
                description="توحيد حالة الأحرف مع ما تتوقعه الاختبارات."
                code={`class SourceControlErrorCode(str, Enum):
    AUTH_REQUIRED = "AUTH_REQUIRED"       # UPPER_CASE
    AUTH_EXPIRED = "AUTH_EXPIRED"
    PERMISSION_DENIED = "PERMISSION_DENIED"
    NOT_FOUND = "NOT_FOUND"
    RATE_LIMITED = "RATE_LIMITED"
    NETWORK_ERROR = "NETWORK_ERROR"
    CONFLICT = "CONFLICT"
    VALIDATION_ERROR = "VALIDATION_ERROR"
    UNSUPPORTED_CAPABILITY = "UNSUPPORTED_CAPABILITY"
    REMOTE_STATE_CHANGED = "REMOTE_STATE_CHANGED"
    PROVIDER_ERROR = "PROVIDER_ERROR"
    WORKSPACE_DIRTY = "WORKSPACE_DIRTY"
    APPROVAL_REQUIRED = "APPROVAL_REQUIRED"
    APPROVAL_INVALID = "APPROVAL_INVALID"
    PATH_TRAVERSAL_DETECTED = "PATH_TRAVERSAL_DETECTED"
    COMMAND_TIMEOUT = "COMMAND_TIMEOUT"`}
              />
              <FixItem
                priority={4}
                title="إضافة COPIED إلى FileChangeType"
                description="الاختبارات تتوقع 5 قيم."
                code={`class FileChangeType(str, Enum):
    ADDED = "added"
    MODIFIED = "modified"
    DELETED = "deleted"
    RENAMED = "renamed"
    COPIED = "copied"  # إضافة هذا`}
              />
              <FixItem
                priority={5}
                title="إصلاح has_provider → has"
                description="تصحيح اسم الـ method في providers/__init__.py"
                code={`# في providers/__init__.py:
if not target_registry.has(ProviderId.GITHUB):  # بدلاً من has_provider
    target_registry.register(GitHubProviderAdapter())`}
              />
            </div>
          </div>

          <div>
            <h4 className="text-blue-400 font-bold text-lg mb-3">🏗️ إصلاحات معمارية (Architecture Fixes)</h4>
            <div className="space-y-3">
              <FixItem
                priority={6}
                title="إزالة التكرار - ApprovalTicket"
                description="حذف ApprovalTicket من security/approval.py واستيراده من domain/models.py"
                code={`# في security/approval.py:
# حذف التعريف المكرر واستيراده:
from ..domain.models import ApprovalTicket`}
              />
              <FixItem
                priority={7}
                title="تطبيق Dependency Injection حقيقي"
                description="استبدال الـ global singletons بـ DI Container"
                code={`# بدلاً من:
def get_default_operation_service() -> OperationService: ...

# استخدم DI Container:
class Container:
    def __init__(self):
        self._services = {}
    
    def register(self, name, factory):
        self._services[name] = factory
    
    def resolve(self, name):
        return self._services[name]()`}
              />
              <FixItem
                priority={8}
                title="توحيد Async/Sync Interface"
                description="اختيار نمط واحد (async أو sync) والالتزام به في كل الـ interfaces"
                code={`# الخيار الأفضل: async everywhere (لأن Git operations I/O bound)
class OperationJournal:
    async def save_record(self, record: OperationRecord) -> None: ...
    async def get_record(self, operation_id: str) -> Optional[OperationRecord]: ...
    async def append_event(self, operation_id: str, event: OperationEvent) -> None: ...`}
              />
            </div>
          </div>

          <div>
            <h4 className="text-purple-400 font-bold text-lg mb-3">🔒 إصلاحات أمنية</h4>
            <div className="space-y-3">
              <FixItem
                priority={9}
                title="تحسين حماية المسارات"
                description="إضافة .circleci وأنماط إضافية لـ workflow protection"
                code={`workflow_patterns = (
    ".github/workflows/*",
    ".gitlab-ci.yml",
    "bitbucket-pipelines.yml",
    ".circleci/*",           # إضافة
    ".travis.yml",           # إضافة
    "Jenkinsfile",           # إضافة
    "azure-pipelines.yml",   # إضافة
)`}
              />
              <FixItem
                priority={10}
                title="تحسين حماية الفروع"
                description="جعل المقارنة case-insensitive وإضافة أنماط أكثر"
                code={`def is_protected_branch(branch_name: str, policy=None) -> bool:
    active_policy = policy or SourceControlPolicy()
    clean_name = branch_name.strip().lower()  # case-insensitive
    return any(
        fnmatch.fnmatchcase(clean_name, pat.lower())
        for pat in active_policy.branch_policy.protected_patterns
    )`}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function FixItem({ priority, title, description, code }: { priority: number; title: string; description: string; code?: string }) {
  return (
    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-blue-900 text-blue-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {priority}
        </span>
        <span className="text-white font-bold">{title}</span>
      </div>
      <p className="text-gray-400 text-sm mb-2">{description}</p>
      {code && <CodeBlock>{code}</CodeBlock>}
    </div>
  );
}

function BestPracticesSection() {
  return (
    <div>
      <Card title="⭐ أفضل المعماريات لتكامل Source Control" variant="success">
        <div className="space-y-6 text-gray-300">
          <p>
            بناءً على أفضل الممارسات في الصناعة ومبادئ Clean Architecture و Hexagonal Architecture،
            إليك المعمارية المثالية لبناء تكامل Source Control:
          </p>

          <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600">
            <h4 className="text-orange-400 font-bold text-lg mb-4">🏛️ المعمارية المقترحة</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-green-400 font-bold mb-2">الطبقات (Layers)</h5>
                <div className="space-y-2 text-sm">
                  <div className="bg-green-900/30 border border-green-800 rounded p-2">
                    <strong>1. Domain Layer</strong> - نماذج نقية بدون أي dependencies خارجية
                  </div>
                  <div className="bg-blue-900/30 border border-blue-800 rounded p-2">
                    <strong>2. Application Layer</strong> - Use Cases / Application Services
                  </div>
                  <div className="bg-purple-900/30 border border-purple-800 rounded p-2">
                    <strong>3. Infrastructure Layer</strong> - Git, HTTP, Database adapters
                  </div>
                  <div className="bg-orange-900/30 border border-orange-800 rounded p-2">
                    <strong>4. Interface Layer</strong> - HTTP Routes, CLI, Agent Tools
                  </div>
                </div>
              </div>
              <div>
                <h5 className="text-green-400 font-bold mb-2">المبادئ (Principles)</h5>
                <ul className="space-y-1 text-sm">
                  <li>✅ Dependency Rule: الداخل لا يعتمد على الخارج</li>
                  <li>✅ Ports في الداخل، Adapters في الخارج</li>
                  <li>✅ DI عبر Constructor Injection</li>
                  <li>✅ Single Responsibility لكل class</li>
                  <li>✅ Interface Segregation</li>
                  <li>✅ No Global State</li>
                  <li>✅ Explicit Dependencies</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600">
            <h4 className="text-orange-400 font-bold text-lg mb-4">📁 هيكل الملفات المقترح</h4>
            <CodeBlock>{`backend/integrations/source_control/
├── domain/
│   ├── __init__.py
│   ├── models.py          # WorkspaceRef, ApprovalTicket, RepositoryRef...
│   ├── enums.py           # ProviderId, OperationState, FileChangeType
│   ├── policies.py        # BranchPolicy, WorkflowPolicy
│   └── events.py          # Domain Events
│
├── application/
│   ├── __init__.py
│   ├── services/
│   │   ├── workspace_service.py    # Use cases for workspace management
│   │   ├── approval_service.py     # Use cases for approval workflow
│   │   ├── operation_service.py    # Use cases for operation lifecycle
│   │   └── diff_service.py         # Use cases for diff inspection
│   └── ports/
│       ├── repository_port.py      # Abstract: list repos, get repo
│       ├── workspace_port.py       # Abstract: create workspace, get diff
│       ├── approval_port.py        # Abstract: create/approve tickets
│       └── persistence_port.py     # Abstract: save/load operations
│
├── infrastructure/
│   ├── __init__.py
│   ├── git/
│   │   ├── executable.py           # Git CLI wrapper
│   │   ├── workspace_adapter.py    # Implements WorkspacePort
│   │   ├── diff_adapter.py         # Implements diff computation
│   │   └── push_adapter.py         # Implements push operations
│   ├── providers/
│   │   ├── github/
│   │   │   ├── client.py           # GitHub API client
│   │   │   └── adapter.py          # Implements RepositoryPort
│   │   ├── gitlab/
│   │   │   ├── client.py
│   │   │   └── adapter.py
│   │   └── bitbucket/
│   │       ├── client.py
│   │       └── adapter.py
│   ├── persistence/
│   │   ├── journal_repository.py   # Implements PersistencePort
│   │   └── sqlite_journal.py       # SQLite implementation
│   └── security/
│       ├── vault_adapter.py        # Implements secret storage
│       ├── redaction.py            # Secret redaction
│       └── path_policy.py          # Path traversal prevention
│
├── interfaces/
│   ├── __init__.py
│   ├── http/
│   │   ├── router.py              # FastAPI routes
│   │   └── schemas.py             # Request/Response DTOs
│   └── agent/
│       ├── tools.py               # Agent tool definitions
│       └── tool_registry.py       # Tool registration
│
├── config/
│   ├── __init__.py
│   ├── container.py               # DI Container
│   └── settings.py                # Configuration
│
└── __init__.py                    # Minimal - only exports public API`}</CodeBlock>
          </div>

          <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600">
            <h4 className="text-orange-400 font-bold text-lg mb-4">🔑 الفروقات الجوهرية عن الكود الحالي</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-300">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-2 px-3 text-right">المعيار</th>
                    <th className="py-2 px-3 text-right">الكود الحالي ❌</th>
                    <th className="py-2 px-3 text-right">المعمارية المقترحة ✅</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-3">Dependency Management</td>
                    <td className="py-2 px-3">Global singletons</td>
                    <td className="py-2 px-3">DI Container + Constructor Injection</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-3">Model Duplication</td>
                    <td className="py-2 px-3">ApprovalTicket في مكانين</td>
                    <td className="py-2 px-3">نموذج واحد في Domain فقط</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-3">Interface Consistency</td>
                    <td className="py-2 px-3">خلط sync/async</td>
                    <td className="py-2 px-3">async everywhere أو sync everywhere</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-3">Error Handling</td>
                    <td className="py-2 px-3">أخطاء مكررة ومتضاربة</td>
                    <td className="py-2 px-3">Error hierarchy واضحة في Domain</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-3">Test Isolation</td>
                    <td className="py-2 px-3">صعب بسبب global state</td>
                    <td className="py-2 px-3">سهل عبر DI و mock ports</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-3">Provider Extension</td>
                    <td className="py-2 px-3">إضافة provider جديد معقدة</td>
                    <td className="py-2 px-3">فقط implement Port + register</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2 px-3">Persistence</td>
                    <td className="py-2 px-3">JSON files فقط</td>
                    <td className="py-2 px-3">Port abstraction + multiple backends</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600">
            <h4 className="text-orange-400 font-bold text-lg mb-4">📋 خطة العمل المقترحة للإصلاح</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="bg-red-900 text-red-300 rounded px-2 py-0.5 text-xs font-bold">Phase 1</span>
                <div>
                  <strong className="text-white">إصلاح الأخطاء الحرجة (يوم 1-2)</strong>
                  <ul className="text-sm text-gray-400 mt-1 list-disc list-inside">
                    <li>إضافة WorkspaceRef إلى domain/models.py</li>
                    <li>تصحيح SourceControlErrorCode values</li>
                    <li>إضافة COPIED إلى FileChangeType</li>
                    <li>تصحيح has_provider → has</li>
                    <li>توحيد أسماء الـ methods</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-orange-900 text-orange-300 rounded px-2 py-0.5 text-xs font-bold">Phase 2</span>
                <div>
                  <strong className="text-white">إصلاح السياسات والـ validation (يوم 3)</strong>
                  <ul className="text-sm text-gray-400 mt-1 list-disc list-inside">
                    <li>تحديث protected branch patterns</li>
                    <li>إضافة .circleci إلى workflow patterns</li>
                    <li>جعل is_protected_branch case-insensitive</li>
                    <li>إصلاح is_workflow_path للـ Windows paths</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-yellow-900 text-yellow-300 rounded px-2 py-0.5 text-xs font-bold">Phase 3</span>
                <div>
                  <strong className="text-white">إزالة التكرار وتوحيد الواجهات (يوم 4-5)</strong>
                  <ul className="text-sm text-gray-400 mt-1 list-disc list-inside">
                    <li>حذف ApprovalTicket المكرر</li>
                    <li>توحيد async/sync interface</li>
                    <li>إزالة aliases المضللة</li>
                    <li>تبسيط __init__.py</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-green-900 text-green-300 rounded px-2 py-0.5 text-xs font-bold">Phase 4</span>
                <div>
                  <strong className="text-white">إعادة هيكلة معمارية (أسبوع 2-3)</strong>
                  <ul className="text-sm text-gray-400 mt-1 list-disc list-inside">
                    <li>فصل إلى Domain / Application / Infrastructure</li>
                    <li>تطبيق DI Container</li>
                    <li>إعادة كتابة Persistence layer</li>
                    <li>تحسين اختبارية الكود</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="📊 ملخص الأرقام" variant="warning">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-red-400">11+</div>
            <div className="text-sm text-gray-400">عيب حرج</div>
          </div>
          <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-orange-400">5+</div>
            <div className="text-sm text-gray-400">اختبارات فاشلة</div>
          </div>
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-yellow-400">3</div>
            <div className="text-sm text-gray-400">نماذج مكررة</div>
          </div>
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-blue-400">4</div>
            <div className="text-sm text-gray-400">مراحل إصلاح</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default App;
