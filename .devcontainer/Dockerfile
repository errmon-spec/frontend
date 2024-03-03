FROM node:20-bookworm-slim

SHELL ["/bin/bash", "-o", "errexit", "-o", "pipefail", "-o", "nounset", "-c"]

# hadolint ignore=DL3008
RUN apt-get update -qq \
    && apt-get install --no-install-recommends -y \
        ca-certificates \
        curl \
        git \
        gnupg2 \
        ssh \
        unzip \
    && rm -rf /var/lib/apt/lists/*

ENV HADOLINT_VERSION="2.12.0"
RUN case "$(dpkg --print-architecture)" in \
      arm64) hadolintArch="arm64" ;; \
      *) hadolintArch="x86_64" ;; \
    esac \
    && curl -fsSL "https://github.com/hadolint/hadolint/releases/download/v${HADOLINT_VERSION}/hadolint-Linux-${hadolintArch}" \
            --output /usr/bin/hadolint \
    && chmod +x /usr/bin/hadolint

EXPOSE 4000

WORKDIR /app

CMD ["/bin/bash"]
