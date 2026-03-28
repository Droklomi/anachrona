'use client';

export default function PageStyles({ css }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
