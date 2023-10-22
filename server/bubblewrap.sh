#/bin/bash

ELAN_HOME=$(cd LeanProject && lake env printenv ELAN_HOME)

(exec bwrap\
  --ro-bind ./LeanProject /LeanProject \
  --ro-bind $ELAN_HOME /elan \
  --ro-bind /usr /usr \
  --dev /dev \
  --proc /proc \
  --symlink usr/lib /lib\
  --symlink usr/lib64 /lib64\
  --symlink usr/bin /bin\
  --symlink usr/sbin /sbin\
  --clearenv \
  --setenv PATH "/elan/bin:/bin" \
  --setenv ELAN_HOME "/elan" \
  --unshare-user \
  --unshare-pid  \
  --unshare-net  \
  --unshare-uts  \
  --unshare-cgroup \
  --die-with-parent \
  --chdir "/LeanProject/" \
  lean --server
)
