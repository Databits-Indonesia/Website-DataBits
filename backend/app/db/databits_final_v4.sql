SET SESSION sql_require_primary_key = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 12, 2026 at 08:41 PM
-- Server version: 11.4.10-MariaDB-cll-lve
-- PHP Version: 8.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `databits`
--

-- --------------------------------------------------------

--
-- Table structure for table `about`
--

CREATE TABLE `about` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `desc` text NOT NULL,
  `our_philosophy` text NOT NULL,
  `our_mission` text NOT NULL,
  `our_vision` text NOT NULL,
  `our_values` text NOT NULL,
  `foundation` date NOT NULL,
  `first_product_launch` date NOT NULL,
  `series_a_funding` date NOT NULL,
  `global_expansion` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `module` varchar(50) NOT NULL,
  `action` varchar(50) NOT NULL,
  `object_id` int NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_logs`
--

INSERT INTO `activity_logs` (`id`, `user_id`, `module`, `action`, `object_id`, `description`, `created_at`) VALUES
(1, 1, 'product', 'create', 1, 'Product baru ditambahkan: BitsChat', '2026-01-26 06:58:16'),
(2, 1, 'product', 'create', 2, 'Product baru ditambahkan: DataBits Convert', '2026-01-26 06:59:21'),
(3, 1, 'product', 'create', 3, 'Product baru ditambahkan: DataBits Shop', '2026-01-26 07:00:29'),
(4, 1, 'category', 'create', 1, 'Category baru ditambahkan: Data Science', '2026-01-26 07:24:31'),
(5, 1, 'category', 'create', 2, 'Category baru ditambahkan: AI Engineer', '2026-01-26 07:24:44'),
(6, 1, 'category', 'create', 3, 'Category baru ditambahkan: AI Research', '2026-01-26 07:24:57'),
(7, 1, 'category', 'create', 4, 'Category baru ditambahkan: Mobile Dev', '2026-01-26 07:25:08'),
(8, 1, 'category', 'create', 5, 'Category baru ditambahkan: Web Dev', '2026-01-26 07:25:21'),
(9, 1, 'category', 'create', 6, 'Category baru ditambahkan: Product Updates', '2026-01-26 07:26:05'),
(10, 1, 'category', 'create', 7, 'Category baru ditambahkan: Data Science', '2026-01-26 07:26:24'),
(11, 1, 'category', 'create', 8, 'Category baru ditambahkan: Engineering', '2026-01-26 07:26:34'),
(12, 1, 'category', 'create', 9, 'Category baru ditambahkan: AI Research', '2026-01-26 07:26:45'),
(13, 1, 'category', 'create', 10, 'Category baru ditambahkan: Industry Trends', '2026-01-26 07:27:05'),
(14, 1, 'user', 'create', 3, 'User baru ditambahkan: databits', '2026-01-29 10:51:00'),
(15, 1, 'user', 'create', 4, 'User baru ditambahkan: asep', '2026-01-29 10:54:42'),
(16, 4, 'blog', 'create', 1, 'Blog baru ditambahkan: The Future of Generative AI in Business', '2026-01-29 12:17:49'),
(17, 1, 'blog', 'create', 2, 'Blog baru ditambahkan: Navigating the World of Big Data', '2026-01-29 12:21:23'),
(18, 1, 'blog', 'create', 3, 'Blog baru ditambahkan: Our Tech Stack for Scalable AI', '2026-01-29 12:23:08'),
(19, 1, 'blog', 'create', 4, 'Blog baru ditambahkan: Ethical Considerations in AI', '2026-01-29 12:24:35'),
(20, 1, 'project', 'create', 1, 'Project baru ditambahkan: Aini Gym Landing Page', '2026-01-29 12:43:06'),
(21, 1, 'project', 'create', 2, 'Project baru ditambahkan: Know Mangrove', '2026-01-29 12:46:25'),
(22, 1, 'project', 'create', 3, 'Project baru ditambahkan: Cross-Attention Video Vision Transformer', '2026-01-29 13:03:08'),
(23, 1, 'project', 'create', 4, 'Project baru ditambahkan: Identification of Lung Disease', '2026-01-29 13:04:57'),
(24, 1, 'project', 'create', 5, 'Project baru ditambahkan: Kopilee Website', '2026-01-29 13:08:52'),
(25, 1, 'project', 'create', 6, 'Project baru ditambahkan: Chatbot RAG', '2026-01-29 13:10:28'),
(26, 1, 'product', 'update', 3, 'Edit data product: DataBits Shop', '2026-01-29 13:19:27'),
(27, 1, 'product', 'update', 1, 'Edit data product: BitsChat', '2026-01-29 13:20:23'),
(28, 1, 'product', 'update', 2, 'Edit data product: DataBits Convert', '2026-01-29 13:20:46'),
(29, 1, 'category', 'create', 11, 'Category baru ditambahkan: Engineering', '2026-01-29 13:47:26'),
(30, 1, 'category', 'create', 12, 'Category baru ditambahkan: Engineering', '2026-01-29 13:48:02'),
(31, 1, 'category', 'create', 13, 'Category baru ditambahkan: Engineering', '2026-01-29 13:54:05'),
(32, 1, 'category', 'create', 14, 'Category baru ditambahkan: Engineering', '2026-01-29 13:58:19'),
(33, 1, 'category', 'create', 17, 'Category baru ditambahkan: Product', '2026-01-31 03:45:42'),
(34, 1, 'category', 'create', 18, 'Category baru ditambahkan: Engineering', '2026-01-31 03:45:59'),
(35, 1, 'category', 'create', 19, 'Category baru ditambahkan: Product', '2026-01-31 03:48:00'),
(36, 1, 'category', 'create', 20, 'Category baru ditambahkan: Engineering', '2026-01-31 03:51:19'),
(37, 1, 'category', 'create', 21, 'Category baru ditambahkan: Computer Vision', '2026-01-31 04:12:40'),
(38, 1, 'category', 'create', 22, 'Category baru ditambahkan: LLM', '2026-01-31 04:12:49'),
(39, 1, 'category', 'create', 23, 'Category baru ditambahkan: Audio Processing', '2026-01-31 04:13:47'),
(40, 1, 'category', 'create', 24, 'Category baru ditambahkan: Reinforcement Learning', '2026-01-31 04:14:07'),
(41, 1, 'research', 'create', 1, 'Research baru ditambahkan: Real-Time Beach Litter Detection and Counting: A Comparative Analysis of RT-DETR Model Variants', '2026-01-31 04:17:09'),
(42, 1, 'research', 'create', 2, 'Research baru ditambahkan: Real-Time Beach Litter Detection and Counting: A Comparative Analysis of RT-DETR Model Variants', '2026-01-31 04:17:57'),
(43, 1, 'research', 'create', 3, 'Research baru ditambahkan: Real-Time Beach Litter Detection and Counting: A Comparative Analysis of RT-DETR Model Variants', '2026-01-31 04:19:30'),
(44, 1, 'research', 'create', 4, 'Research baru ditambahkan: Real-Time Beach Litter Detection and Counting: A Comparative Analysis of RT-DETR Model Variants', '2026-01-31 04:20:18'),
(45, 1, 'research', 'update', 1, 'Edit research: AudioTransformer', '2026-01-31 04:26:59'),
(46, 1, 'publication', 'create', 1, 'Publikasi baru ditambahkan: Real-Time Beach Litter Detection and Counting: A Comparative Analysis of RT-DETR Model Variants', '2026-01-31 04:29:08'),
(47, 1, 'publication', 'create', 2, 'Publikasi baru ditambahkan: Deep Learning Approaches for Mangrove Species Classification', '2026-01-31 04:46:42'),
(48, 1, 'publication', 'create', 3, 'Publikasi baru ditambahkan: Efficient Video Understanding with Context-Aware ViViT Architecture', '2026-01-31 04:48:36'),
(49, 1, 'publication', 'create', 4, 'Publikasi baru ditambahkan: Transformer-Based Audio Signal Processing for Environmental Monitoring', '2026-01-31 04:52:24'),
(50, 1, 'category', 'create', 25, 'Category baru ditambahkan: AI Architecture', '2026-01-31 04:53:49'),
(51, 1, 'research', 'create', 5, 'Research baru ditambahkan: C-A ViViT', '2026-01-31 04:54:57'),
(52, 1, 'category', 'create', 26, 'Category baru ditambahkan: Python Library', '2026-01-31 04:55:24'),
(53, 1, 'research', 'create', 6, 'Research baru ditambahkan: databits', '2026-01-31 04:56:10'),
(54, 1, 'research', 'create', 7, 'Research baru ditambahkan: Flask CNN Mangrove', '2026-01-31 04:57:44'),
(55, 1, 'research', 'create', 8, 'Research baru ditambahkan: Mangrove-Research', '2026-01-31 04:58:43'),
(56, NULL, 'message', 'create', 1, 'Pesan baru: Husni', '2026-01-31 05:08:42'),
(57, NULL, 'message', 'create', 2, 'Pesan baru: Asep', '2026-01-31 05:14:19'),
(58, 1, 'category', 'create', 27, 'Category baru ditambahkan: Test', '2026-01-31 05:18:48'),
(59, 1, 'category', 'delete', 27, 'Hapus category: Test', '2026-01-31 05:19:17'),
(60, 1, 'blog', 'create', 5, 'Blog baru ditambahkan: test', '2026-01-31 06:05:06'),
(61, 1, 'category', 'create', 28, 'Category baru ditambahkan: Engineering', '2026-02-01 06:55:44'),
(62, 1, 'category', 'create', 29, 'Category baru ditambahkan: Engineering', '2026-02-01 06:56:38'),
(63, 1, 'category', 'create', 33, 'Category baru ditambahkan: Product', '2026-02-01 07:14:31'),
(64, 1, 'category', 'create', 35, 'Category baru ditambahkan: Research', '2026-02-01 07:21:07'),
(65, 1, 'category', 'create', 36, 'Category baru ditambahkan: Product', '2026-02-01 07:21:23'),
(66, 1, 'career', 'create', 1, 'Career baru ditambahkan: Product Manager', '2026-02-01 07:25:01'),
(67, 1, 'career', 'create', 2, 'Career baru ditambahkan: DevOps Engineer', '2026-02-01 07:25:53'),
(68, 1, 'career', 'create', 3, 'Career baru ditambahkan: Full Stack Developer', '2026-02-01 07:26:58'),
(69, 1, 'career', 'create', 4, 'Career baru ditambahkan: AI Research Scientist', '2026-02-01 07:28:13'),
(70, 1, 'career', 'create', 5, 'Career baru ditambahkan: Data Scientist', '2026-02-01 07:29:27'),
(71, 1, 'career', 'create', 6, 'Career baru ditambahkan: Senior Machine Learning Engineer', '2026-02-01 07:30:22'),
(72, 1, 'blog', 'update', 1, 'Edit blog: The Future of Generative AI in Business', '2026-02-01 07:47:47'),
(73, 3, 'career', 'delete', 5, 'Hapus career: Data Scientist', '2026-02-10 16:01:47'),
(74, 3, 'blog', 'delete', 5, 'Hapus blog: test', '2026-02-10 16:03:01'),
(75, 3, 'career', 'delete', 1, 'Hapus career: Product Manager', '2026-02-23 02:18:27'),
(76, 3, 'user', 'delete', 4, 'Hapus user: asep', '2026-02-24 05:28:48'),
(77, 3, 'career', 'delete', 6, 'Hapus career: Senior Machine Learning Engineer', '2026-02-26 04:36:48'),
(78, 3, 'career', 'delete', 4, 'Hapus career: AI Research Scientist', '2026-02-26 04:36:57'),
(79, 3, 'career', 'delete', 3, 'Hapus career: Full Stack Developer', '2026-02-26 04:36:58'),
(80, 3, 'career', 'delete', 2, 'Hapus career: DevOps Engineer', '2026-02-26 04:37:02');

-- --------------------------------------------------------

--
-- Table structure for table `alembic_version`
--

CREATE TABLE `alembic_version` (
  `version_num` varchar(32) NOT NULL,
  PRIMARY KEY (`version_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alembic_version`
--

INSERT INTO `alembic_version` (`version_num`) VALUES
('92ebbe9f5f2e');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `views` int DEFAULT NULL,
  `cover_url` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `user_id` int NOT NULL,
  `category_id` int NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `content`, `views`, `cover_url`, `created_at`, `user_id`, `category_id`, `slug`) VALUES
(2, 'Navigating the World of Big Data', 'A deep dive into the methodologies we use to process and analyze petabytes of data efficiently.\n\n## Understanding Big Data\n\nBig Data refers to datasets so large and complex that traditional data processing methods are inadequate. The \"3 Vs\" characterize Big Data:\n\n- **Volume**: Massive amounts of data generated daily\n- **Velocity**: Rapid generation and processing requirements\n- **Variety**: Data in multiple formats and sources\n\n## The DataBits Approach\n\n### 1. Data Collection & Ingestion\n\nWe employ sophisticated ingestion pipelines that can handle:\n- Structured data from databases\n- Unstructured data from various sources\n- Real-time streaming data\n- Legacy system integration\n\n### 2. Data Processing\n\nOur processing architecture includes:\n\n```\nRaw Data → Validation → Transformation → Enrichment → Storage\n```\n\nWe utilize:\n- Apache Spark for distributed processing\n- Kubernetes for container orchestration\n- Custom microservices for specific transformations\n\n### 3. Data Analysis & Insights\n\nWith petabytes of data at our disposal, we extract actionable insights using:\n\n- **Descriptive Analytics**: Understanding what happened\n- **Predictive Analytics**: Forecasting future trends\n- **Prescriptive Analytics**: Recommending optimal actions\n- **Diagnostic Analytics**: Determining root causes\n\n## Key Technologies\n\n### Data Storage\n- **Data Lakes**: Centralized repositories for raw data\n- **Data Warehouses**: Organized structures for analytics\n- **Distributed Databases**: Scalable NoSQL solutions\n\n### Processing Frameworks\n- Apache Spark for batch processing\n- Apache Flink for stream processing\n- Apache Kafka for event streaming\n\n### Analytics Tools\n- Machine Learning pipelines\n- Advanced statistical analysis\n- Real-time dashboards and visualization\n\n## Performance Metrics\n\nOur Big Data infrastructure achieves:\n\n| Metric | Performance |\n|--------|-------------|\n| Query Latency | < 100ms for 99th percentile |\n| Data Processing Speed | 10TB/hour |\n| System Uptime | 99.99% |\n| Data Accuracy | 99.95% |\n\n## Real-World Applications\n\n### Financial Services\n- Fraud detection using anomaly detection\n- Risk assessment across portfolios\n- Market trend analysis\n\n### Healthcare\n- Patient outcome prediction\n- Drug discovery acceleration\n- Resource optimization\n\n### E-commerce\n- Customer behavior analysis\n- Demand forecasting\n- Personalization engines\n\n## Challenges & Solutions\n\n### Challenge: Data Quality\n**Solution**: Automated validation pipelines and data cleansing workflows\n\n### Challenge: Security & Privacy\n**Solution**: End-to-end encryption, access controls, and compliance monitoring\n\n### Challenge: Cost Management\n**Solution**: Intelligent data tiering and optimization algorithms\n\n## Best Practices\n\n1. **Data Governance**: Establish clear ownership and policies\n2. **Scalability Planning**: Design for growth from the start\n3. **Cost Optimization**: Monitor and optimize resource usage\n4. **Security First**: Implement security at every layer\n5. **Team Development**: Invest in data science talent\n\n## Conclusion\n\nSuccessfully navigating Big Data requires the right combination of technology, methodology, and expertise. At DataBits, we\'ve built a comprehensive ecosystem that transforms raw data into strategic advantage. Whether you\'re managing gigabytes or petabytes, our solutions scale with your needs.\n\n---\n\n*Interested in leveraging Big Data for your organization? Let\'s explore how DataBits can help you unlock the full potential of your data.*', 0, '/static/blog/785f44e1-7ca3-4951-a6ec-1ae73a6cc294.png', '2026-01-29 12:21:23', 1, 6, 'navigating-world-of-big-data'),
(3, 'Our Tech Stack for Scalable AI', 'Discover the technologies that power DataBits and why we chose them for performance and reliability.\n\n## Architecture Overview\n\nOur technology stack is designed with scalability, reliability, and performance as core principles. Here\'s what powers DataBits:\n\n## Backend Infrastructure\n\n### Programming Languages\n- **Python**: Primary language for AI/ML workloads\n- **Go**: High-performance services and microservices\n- **Rust**: Critical performance-sensitive components\n\n### Framework & Runtimes\n- **FastAPI**: Modern, fast web framework for APIs\n- **ASGI**: Asynchronous server for high concurrency\n- **gRPC**: Efficient inter-service communication\n\n## Machine Learning Stack\n\n### Model Training & Serving\n- **PyTorch**: Deep learning framework for model development\n- **TensorFlow**: Production ML workflow platform\n- **ONNX**: Standardized model interchange format\n- **TensorServing**: High-performance ML serving system\n\n### MLOps & Orchestration\n- **Airflow**: Workflow orchestration\n- **Kubeflow**: Kubernetes-native ML platform\n- **DVC**: Data and model versioning\n\n## Data Infrastructure\n\n### Storage\n- **PostgreSQL**: Relational database\n- **Redis**: In-memory caching and sessions\n- **S3**: Scalable object storage\n- **Elasticsearch**: Full-text search and analytics\n\n### Processing\n- **Apache Spark**: Distributed data processing\n- **Apache Kafka**: Event streaming platform\n- **Dask**: Parallel computing with Python\n\n## Deployment & Operations\n\n### Containerization & Orchestration\n```yaml\nContainer Runtime: Docker\nOrchestration: Kubernetes\nService Mesh: Istio\nConfiguration: Helm\n```\n\n### Infrastructure as Code\n- **Terraform**: Cloud infrastructure provisioning\n- **Ansible**: Configuration management\n- **Docker Compose**: Local development\n\n## Monitoring & Observability\n\n### Metrics & Logging\n- **Prometheus**: Metrics collection and alerting\n- **ELK Stack**: Elasticsearch, Logstash, Kibana\n- **Jaeger**: Distributed tracing\n- **Grafana**: Visualization and dashboards\n\n### Alerting\n- **Alert Manager**: Alert routing and deduplication\n- **PagerDuty**: Incident management\n- **Slack Integration**: Real-time notifications\n\n## Frontend Technology\n\n### Core Stack\n- **Next.js**: React framework with SSR/SSG\n- **TypeScript**: Type-safe JavaScript\n- **Tailwind CSS**: Utility-first CSS framework\n- **React Query**: Server state management\n\n### Libraries & Tools\n- **Framer Motion**: Animation library\n- **Zustand**: Lightweight state management\n- **SWR**: Data fetching with caching\n\n## Why These Technologies?\n\n### Performance\nOur stack enables sub-100ms API responses and efficient ML inference\n\n### Scalability\nKubernetes-based infrastructure scales from prototype to production seamlessly\n\n### Reliability\nRedundancy, health checks, and auto-recovery ensure 99.99% uptime\n\n### Developer Experience\nModern tooling and frameworks accelerate development and reduce time-to-market\n\n### Community & Support\nAll technologies are well-established with strong community support\n\n## Development Workflow\n\n```\nLocal Development → Docker → Git → CI/CD Pipeline → Kubernetes → Production\n```\n\n### CI/CD\n- **GitHub Actions**: Automated testing and deployment\n- **Semantic Release**: Automated versioning\n- **Docker Registry**: Private container repository\n\n## Performance Benchmarks\n\n| Component | Metric |\n|-----------|--------|\n| API Latency | 45ms p95 |\n| ML Model Inference | 200ms average |\n| Database Query | 10ms p99 |\n| Page Load Time | 1.5s |\n\n## Security & Compliance\n\n- **TLS 1.3**: Encryption in transit\n- **RBAC**: Role-based access control\n- **Secrets Management**: HashiCorp Vault\n- **Compliance**: GDPR, HIPAA ready\n\n## Future Roadmap\n\n- **GPU Acceleration**: Enhanced ML capabilities\n- **Edge Computing**: Distributed inference\n- **Zero-trust Architecture**: Enhanced security\n- **Advanced Observability**: AI-powered insights\n\n## Conclusion\n\nOur carefully curated tech stack balances innovation with stability. Each technology was selected to solve specific problems at scale. This combination enables us to deliver high-performance, reliable AI solutions to our customers.\n\n---\n\n*Want to learn more about our architecture? Visit our GitHub or reach out to discuss technical partnerships.*', 0, '/static/blog/fc2ff9a8-f2ef-447a-912d-ca77c564429c.png', '2026-01-29 12:23:08', 1, 8, 'tech-stack-for-scalable-ai'),
(4, 'Ethical Considerations in AI', 'How we approach building responsible AI systems that are fair, transparent, and accountable.\n\n## Introduction\n\nAs AI systems become increasingly integrated into critical decision-making processes, ethical considerations have moved from the periphery to the center of AI development. At DataBits, we believe that building trustworthy AI isn\'t optional—it\'s essential.\n\n## The Core Pillars of Ethical AI\n\n### 1. Fairness\n\nFairness means ensuring that AI systems don\'t discriminate against individuals or groups based on protected attributes.\n\n**Our Approach:**\n- Audit datasets for representation bias\n- Implement fairness metrics in model evaluation\n- Regular bias testing across demographic groups\n- Transparency reports on model performance disparities\n\n**Key Metrics:**\n- Disparate Impact Ratio\n- Equalized Odds\n- Predictive Parity\n- Calibration across groups\n\n### 2. Transparency\n\nUsers and stakeholders should understand how and why AI systems make decisions.\n\n**Implementation:**\n- Explainable AI (XAI) techniques\n- Feature importance visualization\n- Decision reasoning documentation\n- Regular audit trails and logs\n\n**Tools We Use:**\n- SHAP (SHapley Additive exPlanations)\n- LIME (Local Interpretable Model-agnostic Explanations)\n- Integrated Gradients\n- Decision tree approximations\n\n### 3. Accountability\n\nClear responsibility and consequences for AI system outcomes ensure responsible development.\n\n**Accountability Framework:**\n- Clear ownership and governance structures\n- Regular compliance audits\n- Incident response procedures\n- Stakeholder feedback mechanisms\n\n### 4. Privacy\n\nProtecting individual data rights is fundamental to ethical AI.\n\n**Privacy Safeguards:**\n- Data minimization principles\n- Differential privacy techniques\n- Federated learning approaches\n- GDPR and CCPA compliance\n- Regular security audits\n\n## Common Ethical Challenges\n\n### Bias in Training Data\n\n**Problem**: Historical data often reflects past discrimination\n\n**Solutions:**\n- Balanced dataset curation\n- Synthetic data generation\n- Reweighting techniques\n- Diverse training data sources\n\n### Algorithmic Opacity\n\n**Problem**: Complex models (deep learning) are hard to interpret\n\n**Solutions:**\n- Model-agnostic explanation methods\n- Simpler model alternatives when appropriate\n- Ensemble approaches with interpretability\n- Human-in-the-loop systems\n\n### Data Privacy Violations\n\n**Problem**: Models can memorize and leak sensitive training data\n\n**Solutions:**\n- Differential privacy implementation\n- Federated learning architecture\n- Data anonymization techniques\n- Regular privacy assessments\n\n### Misuse & Dual Use\n\n**Problem**: AI systems can be repurposed for harmful applications\n\n**Solutions:**\n- Use case evaluation frameworks\n- Deployment restrictions where needed\n- Community review processes\n- Ethical guidelines for applications\n\n## Our Ethical AI Framework\n\n```\nDesign Phase → Development → Testing → Deployment → Monitoring\n     ↓              ↓            ↓           ↓            ↓\n  Values        Implementation  Audit    Guidelines   Feedback\n Definition     Guidelines      Tests    Compliance   Loop\n```\n\n### Design Phase\n- Stakeholder consultation\n- Values and principles alignment\n- Use case evaluation\n- Risk assessment\n\n### Development Phase\n- Diverse team involvement\n- Code reviews with ethics focus\n- Documentation of design choices\n- Bias detection integration\n\n### Testing Phase\n- Fairness testing across demographics\n- Adversarial robustness evaluation\n- Privacy protection verification\n- Scenario-based testing\n\n### Deployment Phase\n- Monitoring system setup\n- Clear usage guidelines\n- Stakeholder communication\n- Fallback procedures\n\n### Monitoring Phase\n- Continuous performance tracking\n- Drift detection\n- User feedback collection\n- Regular audits\n\n## Real-World Case Studies\n\n### Hiring Systems\n**Challenge**: Avoid perpetuating historical hiring biases\n\n**Our Solution**:\n- Removed gender/age proxies from features\n- Balanced training data across demographics\n- Regular fairness audits\n- Human review of recommendations\n\n### Credit Scoring\n**Challenge**: Ensure fair access to credit for underrepresented groups\n\n**Our Solution**:\n- Equalized odds constraint\n- Explainable model components\n- Transparent scoring factors\n- Appeal processes for decisions\n\n### Healthcare AI\n**Challenge**: Ensure equitable care recommendations\n\n**Our Solution**:\n- Stratified evaluation across demographics\n- Clinical validation with diverse populations\n- Interpretable risk factors\n- Physician oversight mechanisms\n\n## Industry Standards & Frameworks\n\n- **IEEE Ethically Aligned Design**: Global initiative for ethical AI\n- **EU AI Act**: Regulatory framework for high-risk systems\n- **NIST AI Risk Management Framework**: Risk categorization and mitigation\n- **Partnership on AI**: Multi-stakeholder collaboration\n\n## The Role of Diverse Teams\n\nEthical AI development requires diverse perspectives:\n\n- **Technical Diversity**: Different programming backgrounds and expertise\n- **Demographic Diversity**: Various lived experiences and perspectives\n- **Disciplinary Diversity**: Ethics, law, social sciences, engineering\n- **Experiential Diversity**: People affected by the systems\n\n## Continuous Learning & Improvement\n\n**Our Commitment:**\n1. Regular training on AI ethics for all team members\n2. Participation in ethics research community\n3. Open dialogue with users and stakeholders\n4. Adaptation to emerging ethical challenges\n5. Transparency about limitations and mistakes\n\n## Key Takeaways\n\n- **Ethics is Ongoing**: Ethical AI is not a checkbox but continuous practice\n- **Interdisciplinary**: Requires collaboration across many fields\n- **Transparent**: Stakeholders deserve to understand AI decisions\n- **Accountable**: Clear responsibility for outcomes\n- **Inclusive**: Diverse voices strengthen ethical AI\n\n## Conclusion\n\nBuilding ethical AI is complex, requires humility about limitations, and demands commitment from entire organizations. At DataBits, we believe that ethical AI isn\'t just the right thing to do—it\'s also better for business, leads to more robust systems, and creates lasting trust with users.\n\nThe journey toward truly ethical AI is ongoing. We invite you to join us in advancing this important work.\n\n---\n\n*Questions about AI ethics or our practices? We\'d love to hear from you. Contact our ethics team at ethics@databits.io*', 0, '/static/blog/cb82ce0d-d9d5-404a-b1a4-15dad9d6a9d1.png', '2026-01-29 12:24:35', 1, 9, 'ethic-in-ai');

-- --------------------------------------------------------

--
-- Table structure for table `blog_views`
--

CREATE TABLE `blog_views` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blog_id` int NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `viewed_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `careers`
--

CREATE TABLE `careers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `position` varchar(255) NOT NULL,
  `category_id` int NOT NULL,
  `work_mode` varchar(255) NOT NULL,
  `job_type` varchar(255) NOT NULL,
  `desc` text NOT NULL,
  `apply_link` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `type` enum('PROJECT','BLOG','RESEARCH','CAREER') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `type`) VALUES
(1, 'Data Science', 'PROJECT'),
(2, 'AI Engineer', 'PROJECT'),
(3, 'AI Research', 'PROJECT'),
(4, 'Mobile Dev', 'PROJECT'),
(5, 'Web Dev', 'PROJECT'),
(6, 'Product Updates', 'BLOG'),
(7, 'Data Science', 'BLOG'),
(8, 'Engineering', 'BLOG'),
(9, 'AI Research', 'BLOG'),
(10, 'Industry Trends', 'BLOG'),
(21, 'Computer Vision', 'RESEARCH'),
(22, 'LLM', 'RESEARCH'),
(23, 'Audio Processing', 'RESEARCH'),
(24, 'Reinforcement Learning', 'RESEARCH'),
(25, 'AI Architecture', 'RESEARCH'),
(26, 'Python Library', 'RESEARCH'),
(34, 'Engineering', 'CAREER'),
(35, 'Research', 'CAREER'),
(36, 'Product', 'CAREER');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `headquarters` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `home`
--

CREATE TABLE `home` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `desc` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `list_service`
--

CREATE TABLE `list_service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `service_id` int NOT NULL,
  `service` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `message_content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `name`, `email`, `subject`, `company`, `message_content`) VALUES
(1, 'Husni', 'husni@gmail.com', 'Research Collaboration Offers', 'NVIDIA', 'Test'),
(2, 'Asep', 'asep@gmail.com', 'Grant Agreement', 'Asep Foundation', 'I want donate 1 B dollar for AI research at Databits Indonesia');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desc` text NOT NULL,
  `link` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `name` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `desc`, `link`, `created_at`, `name`, `icon`) VALUES
(1, 'Asisten percakapan AI tingkat lanjut yang disesuaikan untuk kebutuhan perusahaan.', 'https://www.databits.chat', '2026-01-26 06:58:16', 'BitsChat', 'forum'),
(2, 'Konversikan data secara mulus antara berbagai format dengan alat online kami yang canggih.', 'https://databits.co-id.id/convert', '2026-01-26 06:59:21', 'DataBits Convert', 'transform'),
(3, 'Dapatkan merchandise DataBits eksklusif, aset digital, dan sumber daya.', 'https://sociabuzz.com/databits/shop', '2026-01-26 07:00:29', 'DataBits Shop', 'shopping_bag');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `desc` text NOT NULL,
  `cover_url` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `desc`, `cover_url`, `link`, `created_at`, `category_id`) VALUES
(1, 'Aini Gym Landing Page', 'Static landing page website Aini Gym with Next.Js and optimal SEO.', '/static/project/b06b8008-2366-4005-a279-e9721b55f4b8.png', 'https://www.ainigym.my.id', '2026-01-29 12:43:06', 5),
(2, 'Know Mangrove', 'Android application for classifying mangrove types.', '/static/project/5b352456-72df-480c-a408-93e455fcddf6.jpg', 'https://github.com/Databitss/Mangrove-Android-App', '2026-01-29 12:46:25', 4),
(3, 'Cross-Attention Video Vision Transformer', 'Creates a new ViViT-based video feature extraction architecture that has 3.5x lower GFLOPs.', '/static/project/25f70627-5267-4d5a-ab75-8253382b64e0.png', 'https://github.com/Databitss/VideoCaptioning', '2026-01-29 13:03:08', 3),
(4, 'Identification of Lung Disease', 'Creating a model to identify lung disease based on cough sound and medical history.', '/static/project/a8e87d05-5001-4c3b-96dc-b1755001d044.png', 'https://github.com/Databitss/AudioTransformer', '2026-01-29 13:04:57', 1),
(5, 'Kopilee Website', 'Coffee shop website landing page with dynamic data.', '/static/project/6a9bd676-3c6d-452f-9a49-9b9336c1a268.png', 'https://www.kopilee.com', '2026-01-29 13:08:52', 1),
(6, 'Chatbot RAG', 'Chatbot system with Gemini AI and RAG using LangGraph.', '/static/project/d066976b-65db-41f1-9020-ffb3909f26e9.png', 'https://www.databits.chat', '2026-01-29 13:10:28', 2);

-- --------------------------------------------------------

--
-- Table structure for table `publications`
--

CREATE TABLE `publications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `writer` varchar(255) NOT NULL,
  `journal` varchar(255) NOT NULL,
  `desc` text NOT NULL,
  `link` varchar(255) NOT NULL,
  `publication_date` date NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `publications`
--

INSERT INTO `publications` (`id`, `title`, `writer`, `journal`, `desc`, `link`, `publication_date`, `created_at`) VALUES
(1, 'Real-Time Beach Litter Detection and Counting: A Comparative Analysis of RT-DETR Model Variants', 'Miftahul Huda', 'Arxiv', 'RT-DETR model for beach litter detection', 'https://arxiv.org/abs/2508.13101', '2025-08-21', '2026-01-31 04:29:08'),
(2, 'Deep Learning Approaches for Mangrove Species Classification', 'Databits Research Team', 'International Conference on AI and Environment', 'Novel CNN-based approach for automated mangrove species identification using leaf imagery.', 'https://www.mdpi.com/2072-4292/16/16/3093', '2024-08-22', '2026-01-31 04:46:42'),
(3, 'Efficient Video Understanding with Context-Aware ViViT Architecture', 'Databits Research Team', 'IEEE Conference on Computer Vision', 'A new video feature extraction architecture reducing computational complexity by 3.5x.', 'https://arxiv.org/abs/2407.03010', '2025-07-09', '2026-01-31 04:48:36'),
(4, 'Transformer-Based Audio Signal Processing for Environmental Monitoring', 'Databits Research Team', 'Journal of Machine Learning Research', 'Self-attention mechanisms for capturing temporal and spectral features in audio signals.', 'https://arxiv.org/abs/2103.12157', '2023-07-27', '2026-01-31 04:52:24');

-- --------------------------------------------------------

--
-- Table structure for table `researches`
--

CREATE TABLE `researches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `desc` text NOT NULL,
  `link` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `researches`
--

INSERT INTO `researches` (`id`, `title`, `desc`, `link`, `created_at`, `category_id`) VALUES
(1, 'AudioTransformer', 'AudioTransformer to process and analyze audio data using transformer-based architectures. It leverages the power of self-attention mechanisms to capture temporal and spectral features in audio signals.', 'https://github.com/Databitss/AudioTransformer', '2026-01-31 04:17:08', 23),
(5, 'C-A ViViT', 'Creates a new ViViT-based video feature extraction architecture that has 3.5x lower GFLOPs by reducing the quadratic complexity of self-attention.', 'https://github.com/Databitss/VideoCaptioning', '2026-01-31 04:54:57', 25),
(6, 'databits', 'Python library for Text Classifier using LSTM, GRU, and Transformer BERT.', 'https://github.com/Databitss/databits', '2026-01-31 04:56:10', 26),
(7, 'Flask CNN Mangrove', 'Web application with flask to predict mangrove types based on leaves with CNN.', 'https://github.com/Databits-Indonesia/Flask-CNN-Mangrove', '2026-01-31 04:57:43', 21),
(8, 'Mangrove-Research', 'CNN model to predict mangrove species based on their leaves.', 'https://github.com/Databitss/Mangrove-Research', '2026-01-31 04:58:43', 21);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desc` text NOT NULL,
  `created_at` datetime NOT NULL,
  `name` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sup_career`
--

CREATE TABLE `sup_career` (
  `id` int NOT NULL AUTO_INCREMENT,
  `superiority` varchar(255) NOT NULL,
  `desc` text NOT NULL,
  `icon` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','owner') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `role`) VALUES
(1, 'husni@gmail.com', 'husni', '$2b$12$BcWS6DfHXK8Kig9fiv2cIetk2qkncvJuNrey0Ijgx9s7E/p6fcBj6', 'owner'),
(3, 'databits@gmail.com', 'databits', '$2b$12$UUe7PFZpIf6tsZQv/yRvb.eY2Sce7piipQRNFvO0cn1cuiddtykFO', 'owner');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about`
--
-- Integrated PK `version_num`

--
-- Indexes for table `blogs`
--
-- Integrated AI

--
-- AUTO_INCREMENT for table `activity_logs`
--
-- Integrated AI

--
-- AUTO_INCREMENT for table `blogs`
--
-- Integrated AI

--
-- AUTO_INCREMENT for table `blog_views`
--
-- Integrated AI

--
-- AUTO_INCREMENT for table `careers`
--
-- Integrated AI

--
-- AUTO_INCREMENT for table `categories`
--
-- Integrated AI

--
-- AUTO_INCREMENT for table `contact`
--
-- Integrated AI

--
-- AUTO_INCREMENT for table `home`
--
-- Integrated AI

--
-- AUTO_INCREMENT for table `list_service`
--
-- Integrated AI

--
-- AUTO_INCREMENT for table `message`
--
-- Integrated AI

--
-- AUTO_INCREMENT for table `products`
--
-- Integrated AI

--
-- AUTO_INCREMENT for table `projects`
--
-- Integrated AI

--
-- AUTO_INCREMENT for table `publications`
--
-- Integrated AI

--
-- AUTO_INCREMENT for table `researches`
--
-- Integrated AI

--
-- AUTO_INCREMENT for table `services`
--
-- Integrated AI

--
-- AUTO_INCREMENT for table `sup_career`
--
-- Integrated AI

--
-- AUTO_INCREMENT for table `users`
--
-- Integrated AI

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blogs_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `blog_views`
--
ALTER TABLE `blog_views`
  ADD CONSTRAINT `blog_views_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `careers`
--
ALTER TABLE `careers`
  ADD CONSTRAINT `careers_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `list_service`
--
ALTER TABLE `list_service`
  ADD CONSTRAINT `list_service_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `researches`
--
ALTER TABLE `researches`
  ADD CONSTRAINT `researches_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
